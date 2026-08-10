import styles from './EggEfficiency.module.css';
import { calculateCountdown } from '../../utils/HelperFunctions.js';

const EggEfficiency = ({ poultry = [], production = [] }) => {
  if (poultry.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.warningMessage}> ⚠️ No poultry batches found. Please add a poultry record to view performance metrics. </p>
      </div>
    );
  }

  const calculateBatchMetrics = (chicken) => {
    const activeChickenTotal = Number(chicken.active || 0);
    const batchName = chicken.batch;
    const batchLogs = production.filter(
      (log) => log.batch?.trim().toLowerCase() === batchName?.trim().toLowerCase()
    );
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const last30DaysLogs = batchLogs.filter((log) => {
      const logDate = new Date(log.businessDate);
      return logDate >= thirtyDaysAgo && logDate <= today;
    });

    const totalEggs30Days = last30DaysLogs.reduce((sum, log) => sum + Number(log.eggCount || 0), 0);
    const averageDailyProduction = totalEggs30Days / 30;
    const productionEfficiency = activeChickenTotal > 0 ? (averageDailyProduction / activeChickenTotal) * 100 : 0;
    return {
      averageDailyProduction: averageDailyProduction.toFixed(2),
      productionEfficiency: productionEfficiency.toFixed(2),
    };
  };

  return (
    <div className={styles.eggRecordsPage}>
      <div className={styles.performanceDashboard}>
        <div>
          <h2>Flock Performance Analytics</h2>
          <p className={styles.metricLabel}>Metrics calculated over the last 30 days of records</p>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {poultry.map((batchItem) => {
          const metrics = calculateBatchMetrics(batchItem);
          const daysLeft = calculateCountdown(batchItem);
          return (
            <div className={styles.performanceCard} key={batchItem._id}>
              <div className={styles.cardHeader}>
                <h2>Batch: {batchItem.batch}</h2>
                <span className={styles.breedBadge}> {batchItem.breed} </span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}> Active Chickens: </span>
                  <span className={styles.metricValue}> {batchItem.active} birds </span>
                </div>

                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}> Avg. Daily Eggs (30 Days): </span>
                  <span className={styles.metricValue}> 🥚 {metrics.averageDailyProduction} / day </span>
                </div>

                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}> Production Efficiency: </span>
                  <span className={`${styles.metricValue} ${styles.efficiencyText}`} > {metrics.productionEfficiency}% </span>
                </div>

                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}> Culling Countdown: </span>
                  <span className={`${styles.metricValue} ${styles.countdownText}`} >
                    ⏳{' '} {daysLeft !== undefined && !isNaN(daysLeft) ? `${daysLeft} days left` : 'N/A'}
                  </span>
                </div>
              </div>

              <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${Math.min(Number(metrics.productionEfficiency), 100)}%`, }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EggEfficiency;