import React from 'react';
import './HistoryModal.css';

// Функция за изчисляване на месечното щастие
const calculateMonthlyHappiness = (moods) => {
    const monthlyData = {};

    moods.forEach(entry => {
        const month = entry.date.substring(0, 7); // YYYY-MM
        if (!monthlyData[month]) {
            monthlyData[month] = { totalValue: 0, count: 0 };
        }
        monthlyData[month].totalValue += entry.value;
        monthlyData[month].count += 1;
    });

    return Object.entries(monthlyData).map(([month, data]) => {
        // Нормализираме средната стойност (от 1-6) към процент (0-100)
        const averageValue = data.totalValue / data.count;
        const percentage = ((averageValue - 1) / (6 - 1)) * 100;
        return { month, percentage: Math.round(percentage) };
    });
};

// Функция за получаване на емоджи според процента
const getHappinessEmoji = (percentage) => {
    if (percentage >= 80) return '🤩';
    if (percentage >= 60) return '😄';
    if (percentage >= 40) return '😊';
    if (percentage >= 20) return '😐';
    return '😟';
};

function HistoryModal({ onClose, moodsData }) {
    const monthlyHappiness = calculateMonthlyHappiness(moodsData);

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>История на настроенията</h2>
                {monthlyHappiness.length > 0 ? (
                    <ul className="history-list">
                        {monthlyHappiness.map(({ month, percentage }) => (
                            <li key={month} className="history-item">
                                <span className="month-name">{new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                                <div className="happiness-scale">
                                    <span className="happiness-emoji">{getHappinessEmoji(percentage)}</span>
                                    <span className="happiness-percentage">{percentage}% щастлив</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Все още нямате записани настроения.</p>
                )}
            </div>
        </div>
    );
}

export default HistoryModal;
