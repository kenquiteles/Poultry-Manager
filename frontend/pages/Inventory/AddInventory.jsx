import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import styles from './AddInventory.module.css';
const AddInventory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessDate: '',
    itemName: '',
    itemType: '',
    lowStockThreshold: '',
    magnitude: '',
    unit: '',
    quantity: '',
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inventory', {
        businessDate: formData.businessDate || undefined,
        itemName: formData.itemName.trim(),
        itemType: formData.itemType.trim(),
        lowStockThreshold: Number(formData.lowStockThreshold),
        magnitude: Number(formData.magnitude),
        unit: formData.unit.trim(),
        quantity: Number(formData.quantity),
      });
      navigate('/inventory');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create inventory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addInventoryPage}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}>
        <h1>
          Add Inventory
        </h1>
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
          Item Name
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="ex: B-MEG"
            required
          />
        </label>

        <label>
          Item Type
          <input
            type="text"
            name="itemType"
            value={formData.itemType}
            onChange={handleChange}
            placeholder="ex: Feeds, Medicine"
            required
          />
        </label>

        <label>
          Low Stock Threshold
          <input
            type="number"
            name="lowStockThreshold"
            value={formData.lowStockThreshold}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Magnitude
          <input
            type="number"
            name="magnitude"
            value={formData.magnitude}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Unit
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="ex: kg, pcs"
            required
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0" required
          />
        </label>
        <div className={styles.cardBtns}>
          <button
            type="button"
            onClick={() => navigate('/inventory')}
          >
            Cancel
          </button>
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

export default AddInventory;