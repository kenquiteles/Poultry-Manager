import { useState } from 'react';
import api from '../../api/axios';
import styles from './GeminiInsights.module.css';

const GeminiInsights = () => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState('');

  const generateInsight = async () => {
    setLoading(true);

    try {
      const { data } = await api.get('/gemini/advice');
      setInsight(data.advice || 'No recommendations available.');
    } catch (error) {
      console.error(error);
      setInsight('Unable to load AI recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>AI Farm Insights</h3>
      </div>

      <button
        className={styles.generateBtn}
        onClick={generateInsight}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Insights'}
      </button>

      {insight && (
        <div className={styles.content}>
          {insight.split('\n').map((line, index) =>
            line.trim() ? <p key={index}>{line}</p> : null
          )}
        </div>
      )}
    </section>
  );
};

export default GeminiInsights;