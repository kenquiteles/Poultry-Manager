import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import styles from './AddFinance.module.css';
const AddFinance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessDate: '',
    category: '',
    transaction: '',
    amount: '',
    magnitude: '',
    unit: '',
    quantity: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/finance', {
        businessDate: formData.businessDate || undefined,
        category: formData.category.trim(),
        transaction: formData.transaction,
        amount: Number(formData.amount),
        magnitude: Number(formData.magnitude),
        unit: formData.unit.trim(),
        quantity: Number(formData.quantity),
        description: formData.description.trim(),
      });
      navigate('/finance');
    }
    catch (error) {
      alert(error.response?.data?.message || 'Failed to create finance record');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.addFinancePage}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Add Finance</h1>
        <label>
          Transaction
          <select
            name="transaction"
            value={formData.transaction}
            onChange={handleChange}
            required >
            <option value="" disabled> -- Select Type -- </option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>

        <label>
          Business Date
          <input
            type="date"
            name="businessDate"
            value={formData.businessDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <input
            type="text"
            name="category"
            value={formData.category}
            placeholder="e.g., Feeds, Utilities, Sales"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            name="amount"
            value={formData.amount}
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
          />
        </label>

        <label>
          Unit
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="kg, sack, tray, pcs"
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1" required
          />
        </label>

        <label>
          Description
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <div className={styles.cardBtns}>
          <button type="button"
            onClick={() => navigate('/finance')}
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

export default AddFinance;