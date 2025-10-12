import React from 'react';
import './MoodHistoryModal.css';

const MoodHistoryModal = ({ onClose, moodsData, moodEmojis }) => {

    const getEmojiForValue = (value) => {
        const mood = moodEmojis.find(m => m.value === value);
        return mood ? mood.emoji : '';
    };

    const calculateOverallHappiness = () => {
        if (moodsData.length === 0) return null;

        const totalValue = moodsData.reduce((sum, entry) => sum + entry.value, 0);
        const averageValue = totalValue / moodsData.length;

        // Конвертиране на средната стойност (1-6) към процент (0-100)
        const percentage = ((averageValue - 1) / 5) * 100;
        
        // Скалиране на процента в диапазона 10-100
        const scaledPercentage = Math.round(percentage * 0.9 + 10);

        return scaledPercentage;
    };

    const overallHappiness = calculateOverallHappiness();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content mood-history-modal" onClick={e => e.stopPropagation()}>
                <h2>История на настроенията</h2>

                {overallHappiness !== null && (
                    <div className="overall-happiness-section">
                        <h3>Общо ниво на щастие</h3>
                        <div className="happiness-percentage-display">{overallHappiness}%</div>
                    </div>
                )}

                {moodsData.length > 0 ? (
                    <ul className="mood-history-list">
                        {moodsData.map((entry, index) => (
                            <li key={index} className="mood-history-entry">
                                <span className="history-date">{new Date(entry.date).toLocaleDateString('bg-BG')}</span>
                                <span className="history-emoji">{getEmojiForValue(entry.value)}</span>
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

export default MoodHistoryModal;
