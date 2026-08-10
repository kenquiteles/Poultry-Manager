import { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from "./Poultry.module.css";
import { useNavigate } from "react-router-dom";
import { calculateAgeDays, calculateInactive, calculateCountdown } from "../../utils/HelperFunctions.js";


const Poultry = () => {
  const navigate = useNavigate();
  const [poultry, setPoultry] = useState([]);
  const { user } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchPoultry = async () => {
      try {
        const { data } = await api.get('/poultry');
        setPoultry(data.poultry);
      } catch (error) {
        console.error('Failed to fetch poultry:', error);
      }
    };

    fetchPoultry();
  }, []);

  const handleEditClick = (chicken) => {
    setEditingId(chicken._id);
    setEditData(chicken);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev, [name]: value
    }));
  };

  const handleSave = async () => {
    if (activeNum < 0 || activeNum > initialNum) {
      alert('Active chickens must be between 0 and the Initial Quantity.');
      return;
    } try {
      const { data } = await api.put(`/poultry/${editingId}`,
        {
          ...editData,
          initialQuantity: initialNum,
          active: activeNum,
          feedConsumeRateKg: Number(editData.feedConsumeRateKg),
        });

      setPoultry(prev => prev.map(p => p._id === editingId ? data.poultry : p));
      setEditingId(null);
      setEditData({});
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className={styles.poultryPage}>
      <div className={styles.pageHeader}>
        <h1>Poultry</h1>

        {user?.role === 'owner' && (
          <button
            className={styles.addBtn}
            onClick={() => navigate('/poultry/add')}
          >
            +
          </button>
        )}
      </div>

      <div className={styles.poultryCardContainer}>
        {poultry.map((chicken) => (
          <div className={styles.poultryCard} key={chicken._id}>
            {editingId === chicken._id ? (
              <>
                <div className={styles.editForm}>
                  <label>
                    Business Date
                    <input
                      type='date'
                      name='businessDate'
                      value={editData.businessDate?.slice(0, 10) || ''}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Batch
                    <input
                      type="text"
                      name="batch"
                      value={editData.batch}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Breed
                    <input
                      type="text"
                      name="breed"
                      value={editData.breed}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Birthday
                    <input
                      type="date"
                      name="birthday"
                      value={editData.birthday?.slice(0, 10) || ''}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Initial Qty
                    <input
                      type="number"
                      name="initialQuantity"
                      value={editData.initialQuantity}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Active
                    <input
                      type="number"
                      name="active"
                      min="0"
                      max={editData.initialQuantity}
                      value={editData.active}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Feed Rate (kg/day)
                    <input
                      type="number"
                      step="0.01"
                      name="feedConsumeRateKg"
                      value={editData.feedConsumeRateKg}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Target Culling Date
                    <input
                      type="date"
                      name="cullingDate"
                      min={editData.birthday?.slice(0, 10)}
                      value={editData.cullingDate?.slice(0, 10) || ''}
                      onChange={handleEditChange}
                    />
                  </label>
                </div>

                <div className={styles.cardBtns}>
                  <button onClick={handleSave}>
                    Save
                  </button>

                  <button onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2>{chicken.batch}</h2>
                  <p>Breed: {chicken.breed}</p>
                  <p>Age: {calculateAgeDays(chicken.birthday)} days</p>
                  <p>Initial Quantity: {chicken.initialQuantity}</p>
                  <p>Active: {chicken.active}</p>
                  <p>Inactive: {calculateInactive(chicken)}</p>
                  <p> Target Date: {chicken.cullingDate ? chicken.cullingDate.slice(0, 10) : 'Not Set'} </p>
                  <p>Culling Countdown: {calculateCountdown(chicken)} days</p>
                  <p> Date:{' '} {chicken.businessDate ? chicken.businessDate.slice(0, 10) : 'N/A'} </p>
                </div>

                {user?.role === 'owner' && (
                  <div className={styles.cardBtns}>
                    <button onClick={() => handleEditClick(chicken)}>Edit</button>
                    <button onClick={async () => {
                      try {
                        await api.delete(`/poultry/${chicken._id}`);
                        setPoultry(prev => prev.filter(p => p._id !== chicken._id));
                      } catch (error) {
                        alert(error.response?.data?.message || 'Delete failed');
                      }
                    }}
                    >Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div >
  );
};

export default Poultry;