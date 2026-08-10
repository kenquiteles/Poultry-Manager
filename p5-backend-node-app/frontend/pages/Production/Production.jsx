import { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './Production.module.css';
import { useNavigate } from 'react-router-dom';

const Production = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [production, setProduction] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  useEffect(() => {
    const fetchProduction = async () => {
      try {
        const { data } = await api.get('/production');
        setProduction(data.production);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduction();
  }, []);

  const handleEditClick = (egg) => {
    setEditingId(egg._id); setEditData({
      businessDate: egg.businessDate?.slice(0, 10) || '',
      batch: egg.batch, eggCount: egg.eggCount,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const { data } = await api.put(`/production/${editingId}`,
        {
          businessDate: editData.businessDate,
          batch: editData.batch,
          eggCount: Number(editData.eggCount),
        });

      setProduction((prev) => prev.map((p) => (p._id === editingId ? data.production : p)));
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/production/${id}`);
      setProduction((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className={styles.productionPage}>
      <div className={styles.pageHeader}>
        <h1>Productions</h1>

        <button className={styles.addBtn}
          onClick={() => navigate('/production/add')}
        >
          +
        </button>
      </div>

      <div className={styles.productionCardContainer}>
        {production.map((egg) => (
          <div className={styles.productionCard} key={egg._id}>
            {editingId === egg._id ? (
              <>
                <div className={styles.editForm}>
                  <label>
                    Business Date
                    <input
                      type="date"
                      name="businessDate"
                      value={editData.businessDate}
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
                    Egg Count
                    <input
                      type="number"
                      name="eggCount"
                      value={editData.eggCount}
                      onChange={handleEditChange}
                      min="0"
                    />
                  </label>
                </div>

                <div className={styles.cardBtns}>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2>Batch: {egg.batch}</h2>
                  <p>Eggs Collected: 🥚 {egg.eggCount}</p>
                  <p> Date:{' '} {egg.businessDate ? egg.businessDate.slice(0, 10) : 'N/A'} </p>
                </div>

                {user?.role === 'owner' && (
                  <div className={styles.cardBtns}>
                    <button onClick={() => handleEditClick(egg)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(egg._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Production;