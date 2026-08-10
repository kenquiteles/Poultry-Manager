import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import styles from './AddPoultry.module.css';

const AddPoultry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessDate: '',
    batch: '',
    breed: '',
    birthday: '',
    initialQuantity: '',
    feedConsumeRateKg: '',
    cullingDate: '',
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/poultry', {
        businessDate: formData.businessDate || undefined,
        batch: formData.batch.trim(),
        breed: formData.breed.trim(),
        birthday: formData.birthday,
        initialQuantity: Number(formData.initialQuantity),
        active: Number(formData.initialQuantity),
        feedConsumeRateKg: Number(formData.feedConsumeRateKg),
        cullingDate: formData.cullingDate,
      });
      navigate('/poultry');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create poultry');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.addPoultryCard}>
          <h1>Add Poultry</h1>

          <label>
            Business Date
            <input
              type="date"
              name="businessDate"
              value={formData.businessDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Batch
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Breed
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Birthday
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Initial Quantity
            <input type="number"
              name="initialQuantity"
              value={formData.initialQuantity}
              onChange={handleChange}
              min="1"
              required
            />
          </label>

          <label>
            Feed Consume Rate (kg/day)
            <input
              type="number"
              step="0.01"
              name="feedConsumeRateKg"
              value={formData.feedConsumeRateKg}
              onChange={handleChange}
              min="0"
              required
            />
          </label>

          <label>
            Target Culling Date
            <input type="date"
              name="cullingDate"
              value={formData.cullingDate}
              onChange={handleChange}
              min={formData.birthday}
              required
            />
          </label>
        </div>

        <div className={styles.cardBtns}>
          <button
            type="button"
            onClick={() => navigate('/poultry')}
          > Cancel </button>

          <button
            type="submit"
            disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPoultry;