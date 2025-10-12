import React from 'react';
import './MoodHistoryModal.css'; // Reuse the same styles for consistency

const HappinessHistoryModal = ({ onClose, moodsData }) => {

    const getMonthlyHappiness = () => {
        if (moodsData.length === 0) return [];

        const monthlyData = {};

        moodsData.forEach(entry => {
            const monthYear = new Date(entry.date).toLocaleString('bg-BG', { month: 'long', year: 'numeric' });
            
            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = { totalValue: 0, count: 0 };
            }
            monthlyData[monthYear].totalValue += entry.value;
            monthlyData[monthYear].count++;
        });

        return Object.entries(monthlyData).map(([month, data]) => {
            const averageValue = data.totalValue / data.count;
            const percentage = ((averageValue - 1) / 5) * 100;
            const scaledPercentage = Math.round(percentage * 0.9 + 10);
            return { month, percentage: scaledPercentage };
        });
    };

    const monthlyHappiness = getMonthlyHappiness();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content mood-history-modal" onClick={e => e.stopPropagation()}>
                <h2>История на щастието</h2>
                {monthlyHappiness.length > 0 ? (
                    <ul className="mood-history-list">
                        {monthlyHappiness.map((item, index) => (
                            <li key={index} className="mood-history-entry">
                                <span className="history-date">{item.month}</span>
                                <span className="history-percentage">{item.percentage}% щастие</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Няма записани настроения все още.</p>
                )}
                <button onClick={onClose} className="close-btn">Затвори</button>
            </div>
        </div>
    );
};

export default HappinessHistoryModal;
