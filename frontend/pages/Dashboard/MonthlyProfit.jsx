import styles from './MonthlyProfit.module.css';
const MonthlyProfit = ({ finance = [] }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const startDate = new Date(currentYear, currentMonth, 1);
  const endDate = new Date(currentYear, currentMonth + 1, 0);
  const formatDateOptions = { month: 'long', day: 'numeric', year: 'numeric', };
  const formattedStart = startDate.toLocaleDateString('en-US', formatDateOptions);
  const formattedEnd = endDate.toLocaleDateString('en-US', formatDateOptions);
  const currentMonthRecords = finance.filter((record) => {
    if (!record.businessDate)
      return false;
    const recordDate = new Date(record.businessDate);
    return (recordDate.getFullYear() === currentYear && recordDate.getMonth() === currentMonth);
  });

  const settledRecords = currentMonthRecords.filter((record) => (record.paymentStatus || 'Unpaid') === 'Paid');

  const totalIncome = settledRecords
    .filter((record) => record.transaction === 'Income')
    .reduce(
      (sum, record) =>
        sum + Number(record.amount || 0) * Number(record.quantity || 0), 0);

  const totalExpenses = settledRecords
    .filter((record) => record.transaction === 'Expense')
    .reduce(
      (sum, record) =>
        sum + Number(record.amount || 0) * Number(record.quantity || 0), 0);
  const netProfit = totalIncome - totalExpenses;

  const paidRecords = finance
  .filter( (record) => (record.paymentStatus || 'Unpaid') === 'Paid' );

  const allTimeIncome = paidRecords .filter((record) => record.transaction === 'Income')
  .reduce( (sum, record) => sum + (record.amount || 0) * (record.quantity || 0), 0 );
  
  const allTimeExpenses = paidRecords
  .filter((record) => record.transaction === 'Expense')
  .reduce( (sum, record) => sum + (record.amount || 0) * (record.quantity || 0), 0 );
  
  const allTimeNetProfit = allTimeIncome - allTimeExpenses;

  return (
    <div className={styles.financeSummaryContainer}>
      <div className={styles.dashboardHeader}>
        <div>
          <h2>Financial Overview</h2>
          <p className={styles.subtext}> Calculation Period: {formattedStart} to {formattedEnd} </p>
        </div>
      </div>
      <div className={styles.cardGrid}>
        <div className={`${styles.summaryCard} ${styles.incomeCard}`}>
          <div className={styles.cardHeader}>
            <span>Total Monthly Income</span>
          </div>
          <div className={styles.cardBody}>
            <h3>
              ₱
              {totalIncome.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
        </div>
        <div className={`${styles.summaryCard} ${styles.expenseCard}`}>
          <div className={styles.cardHeader}>
            <span>
              Total Monthly Expenses
            </span>
          </div>
          <div className={styles.cardBody}>
            <h3>
              ₱
              {totalExpenses.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
        </div>
        <div className={`${styles.summaryCard} ${netProfit >= 0 ? styles.profitCard : styles.lossCard}`} >
          <div className={styles.cardHeader}>
            <span>Net Monthly Profit</span>
          </div>
          <div className={styles.cardBody}>
            <h3>
              ₱
              {netProfit.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
        </div>
        <div className={`${styles.summaryCard} ${netProfit >= 0 ? styles.profitCard : styles.lossCard}`} >
          <div className={styles.cardHeader}>
            <span>
              All-Time Net Profit
            </span>
          </div>
          <div className={styles.cardBody}>
            <h3>
              ₱
              {allTimeNetProfit.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyProfit;