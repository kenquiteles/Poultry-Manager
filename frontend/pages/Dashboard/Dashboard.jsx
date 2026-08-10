import { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import MonthlyProfit from './MonthlyProfit.jsx';
import EggEfficiency from './EggEfficiency.jsx';
import styles from './Dashboard.module.css';
const Dashboard = () => {
  const [poultry, setPoultry] = useState([]);
  const [production, setProduction] = useState([]);
  const [finance, setFinance] = useState([]); useEffect(() => {
    const fetchData = async () => {
      try {
        const [poultryRes, productionRes, financeRes] = await Promise.all([
          api.get('/poultry'),
          api.get('/production'),
          api.get('/finance'),
        ]);
        setPoultry(poultryRes.data.poultry || []);
        setProduction(productionRes.data.production || []);
        setFinance(financeRes.data.finance || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <aside className={styles.monthlyProfit}>
        <MonthlyProfit finance={finance} />
      </aside>
      <section className={styles.eggEfficiency}>
        <EggEfficiency poultry={poultry} production={production} />
      </section>
    </div>
  );
};

export default Dashboard;