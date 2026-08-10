import { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './Inventory.module.css';
import { useNavigate } from 'react-router-dom';
const Inventory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await api.get('/inventory');
        setInventory(data.inventory);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
      }
    };
    fetchInventory();
  }, []);

  const handleEditClick = (stock) => {
    setEditingId(stock._id);
    setEditData({
      businessDate: stock.businessDate?.slice(0, 10) || '',
      itemName: stock.itemName,
      itemType: stock.itemType,
      lowStockThreshold: stock.lowStockThreshold,
      magnitude: stock.magnitude,
      unit: stock.unit,
      quantity: stock.quantity,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value, }));
  };

  const handleSave = async () => {
    try {
      const { data } = await api.put(`/inventory/${editingId}`, {
        businessDate: editData.businessDate,
        itemName: editData.itemName,
        itemType: editData.itemType,
        lowStockThreshold: Number(editData.lowStockThreshold),
        magnitude: Number(editData.magnitude),
        unit: editData.unit,
        quantity: Number(editData.quantity),
      });

      setInventory((prev) => prev.map((p) => (p._id === editingId ? data.inventory : p)));
      setEditingId(null); setEditData({});
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
      await api.delete(`/inventory/${id}`);
      setInventory((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className={styles.inventoryPage}>
      <div className={styles.pageHeader}>
        <h1>Inventory</h1>

        {user?.role === 'owner' && (
          <button
            className={styles.addBtn}
            onClick={() => navigate('/inventory/add')}
          >
            +
            </button>
        )}
      </div>

      <div className={styles.inventoryCardContainer}>
        {inventory.map((stock) => (
          <div className={styles.inventoryCard} key={stock._id}>
            {editingId === stock._id ? (
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
                    Item Name
                    <input
                      type="text"
                      name="itemName"
                      value={editData.itemName}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Item Type
                    <input
                      type="text"
                      name="itemType"
                      value={editData.itemType}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Low Stock Threshold
                    <input
                      type="number"
                      name="lowStockThreshold"
                      value={editData.lowStockThreshold}
                      onChange={handleEditChange}
                    />
                  </label>

                  <div className={styles.volumeWeight}>
                    <label>
                      Magnitude
                      <input
                        type="number"
                        name="magnitude"
                        value={editData.magnitude}
                        onChange={handleEditChange}
                      />
                    </label>

                    <label>
                      Unit
                      <input
                        type="text"
                        name="unit"
                        value={editData.unit}
                        onChange={handleEditChange}
                      />
                    </label>
                  </div>

                  <label>
                    Quantity
                    <input
                      type="number"
                      name="quantity"
                      value={editData.quantity}
                      onChange={handleEditChange}
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
                  <h2>{stock.itemName}</h2>
                  <p>Type: {stock.itemType}</p>
                  <p>Low Stock Threshold: {stock.lowStockThreshold}</p>
                  <p> Magnitude: {stock.magnitude} {stock.unit} </p>
                  <p>Quantity: {stock.quantity}</p>
                  <p> Date:{' '} {stock.businessDate ? stock.businessDate.slice(0, 10) : 'N/A'} </p>
                </div>

                {user?.role === 'owner' && (
                  <div className={styles.cardBtns}>
                    <button onClick={() => handleEditClick(stock)}> Edit </button>
                    <button onClick={() => handleDelete(stock._id)}> Delete </button>
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

export default Inventory;