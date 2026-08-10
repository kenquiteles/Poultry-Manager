import { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './Finance.module.css';
import { useNavigate } from 'react-router-dom';
const Finance = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [finance, setFinance] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [filter, setFilter] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const { data } = await api.get('/finance');
        setFinance(data.finance);
      } catch (error) {
        console.error('Failed to fetch finance records:', error);
      }
    };
    fetchFinance();
  }, []);

  const filteredFinance = filter === 'All' ? finance : finance.filter((record) => record.transaction === filter);

  const handleEditClick = (record) => {
    setEditingId(record._id);
    setEditData({
      businessDate: record.businessDate?.slice(0, 10) || '',
      category: record.category,
      transaction: record.transaction,
      amount: record.amount,
      magnitude: record.magnitude,
      unit: record.unit,
      quantity: record.quantity,
      description: record.description || '',
      paymentStatus: record.paymentStatus || 'Unpaid',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value, }));
  };

  const handleSave = async () => {
    try {
      const { data } = await api.put(`/finance/${editingId}`, {
        businessDate: editData.businessDate,
        category: editData.category,
        transaction: editData.transaction,
        amount: Number(editData.amount),
        magnitude: Number(editData.magnitude),
        unit: editData.unit,
        quantity: Number(editData.quantity),
        description: editData.description,
        paymentStatus: editData.paymentStatus || 'Unpaid',
      });

      setFinance((prev) => prev.map((p) => (p._id === editingId ? data.finance : p)));
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
      await api.delete(`/finance/${id}`);
      setFinance((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className={styles.financePage}>
      <div className={styles.pageHeader}>
        <h1>Transaction</h1>

        <div className={styles.filterWrapper}>
          <button className={styles.filterBtn}
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            {filter}
          </button>

          {showFilterMenu && (
            <div className={styles.filterMenu}>
              <button
                onClick={() => {
                  setFilter('All');
                  setShowFilterMenu(false);
                }}
              >
                All
              </button>

              <button
                onClick={() => {
                  setFilter('Income');
                  setShowFilterMenu(false);
                }}
              >
                Income
              </button>

              <button
                onClick={() => {
                  setFilter('Expense');
                  setShowFilterMenu(false);
                }}
              >
                Expense
              </button>
            </div>
          )}
        </div>

        {user?.role === 'owner' && (
          <button className={styles.addBtn}
            onClick={() => navigate('/finance/add')}
          >
            +
          </button>
        )}
      </div>

      <div className={styles.financeCardContainer}>
        {filteredFinance.map((record) => (
          <div className={styles.financeCard} key={record._id}>
            {editingId === record._id ? (
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
                    Category
                    <input
                      type="text"
                      name="category"
                      value={editData.category}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Transaction
                    <select
                      name="transaction"
                      value={editData.transaction}
                      onChange={handleEditChange}
                    >
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </label>

                  <label>
                    Amount
                    <input
                      type="number"
                      name="amount"
                      value={editData.amount}
                      onChange={handleEditChange}
                    />
                  </label>

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

                  <label>
                    Quantity
                    <input
                      type="number"
                      name="quantity"
                      value={editData.quantity}
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Description
                    <input
                      type="text"
                      name="description"
                      value={editData.description}
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
                  <div className={styles.statusRow}>
                    <h2>{record.transaction}</h2>

                    <button
                      className={`${styles.toggle} ${(record.paymentStatus || 'Unpaid') === 'Paid'
                        ? styles.togglePaid
                        : styles.toggleUnpaid
                        }`}
                      onClick={async () => {
                        const newStatus =
                          (record.paymentStatus || 'Unpaid') === 'Paid'
                            ? 'Unpaid'
                            : 'Paid';

                        try {
                          const { data } = await api.put(
                            `/finance/${record._id}`,
                            { paymentStatus: newStatus }
                          );
                          setFinance((prev) => prev.map((p) => p._id === record._id ? data.finance : p));
                        } catch (error) {
                          alert('Failed to update status');
                        }
                      }}
                    >
                      <span className={styles.toggleKnob}></span>
                    </button>
                  </div>
                  <p
                    className={
                      (record.paymentStatus || 'Unpaid') === 'Paid'
                        ? styles.paidText
                        : styles.unpaidText
                    }
                  >
                    Status: {record.paymentStatus || 'Unpaid'}
                  </p>
                  <p>Category: {record.category}</p>
                  <p>Amount: ₱{Number(record.amount || 0).toLocaleString()}</p>
                  <p> Magnitude: {record.magnitude} {record.unit} </p>
                  <p>Quantity: {record.quantity}</p>
                  <p> Description: {record.description || 'No description provided.'} </p>
                  <p> Total: ₱ {(Number(record.amount || 0) * Number(record.quantity || 0)).toLocaleString()} </p>
                  <p> Date:{' '} {record.businessDate ? record.businessDate.slice(0, 10) : 'N/A'} </p>
                </div>
                {user?.role === 'owner' && (
                  <div className={styles.cardBtns}>
                    <button onClick={() => handleEditClick(record)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(record._id)}
                    >
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

export default Finance;