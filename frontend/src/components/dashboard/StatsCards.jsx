import { formatCount } from '../../utils/formatters';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  return (
    <div className="stats-grid animate-fade-in-up">
      {stats.map((card) => (
        <div key={card.label} className="stat-card glass">
          <div className="stat-icon" style={{ background: `${card.color}20`, color: card.color }}>
            <card.icon size={22} />
          </div>
          <div>
            <p className="stat-value">{formatCount(card.value)}</p>
            <p className="stat-label">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
