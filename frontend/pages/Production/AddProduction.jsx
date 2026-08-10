import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import styles from './AddProduction.module.css';

const AddProduction = () => {
  const navigate = useNavigate();
  const [poultry, setPoultry] = useState([]);
  const [formData, setFormData] = useState({
    businessDate: '',
    batch: '',
    eggCount: '',
  });

  useEffect(() => {
    const fetchPoultry = async () => {
      try {
        const { data } = await api.get('/poultry');
        setPoultry(data.poultry);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoultry();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/production', {
        businessDate: formData.businessDate || undefined,
        batch: formData.batch,
        eggCount: Number(formData.eggCount),
      });
      navigate('/production');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save production');
    }
  };
  return (
    <div className={styles.addProductionPage}>
      {poultry.length === 0 ? (<div className={styles.noPoultryMessage}>
        <p> ⚠️ No poultry records found. Please add a poultry batch first before logging egg production. </p>

        <button
          type="button"
          className={styles.redirectBtn}
          onClick={() => navigate('/poultry/add')}
        >
          Go to Add Poultry
        </button>
      </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Add Production</h1>
          <label>
            Business Date
            <input type="date"
              name="businessDate"
              value={formData.businessDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Batch
            <select
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required >
              <option value="" disabled hidden>
                -- Select Batch --
              </option>
              {poultry.map((item) => (
                <option key={item._id} value={item.batch}>
                  {item.batch}
                </option>
              ))}
            </select>
          </label>

          <label>
            Egg Count
            <input
              type="number"
              name="eggCount"
              value={formData.eggCount}
              onChange={handleChange}
              min="0"
              placeholder="Total eggs collected"
              required
            />

          </label>
          <div className={styles.cardBtns}>
            <button
              type="button"
              onClick={() => navigate('/production')}
            >
              Cancel
            </button>

            <button
              type="submit">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProduction;