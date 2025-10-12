import React, { useState, useEffect } from 'react';
import './MoodTrackerPage.css';
import MoodHistoryModal from '../components/MoodHistoryModal';

const emojis = {
    'sad': { emoji: '😞', value: 1 },
    'neutral': { emoji: '😐', value: 2 },
    'happy': { emoji: '🙂', value: 3 },
    'very-happy': { emoji: '😄', value: 4 },
    'ecstatic': { emoji: '😍', value: 5 }
};

const MoodTrackerPage = () => {
    const [moods, setMoods] = useState(() => {
        const savedMoods = localStorage.getItem('moods');
        return savedMoods ? JSON.parse(savedMoods) : [];
    });
    const [todayMood, setTodayMood] = useState(null);
    const [happinessPercentage, setHappinessPercentage] = useState(0);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);

    const todayString = new Date().toISOString().split('T')[0];

    useEffect(() => {
        localStorage.setItem('moods', JSON.stringify(moods));
        
        const todayEntry = moods.find(m => m.date === todayString);
        if (todayEntry) {
            setTodayMood(todayEntry.mood);
        }

        // Calculate current month's happiness
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const currentMonthMoods = moods.filter(m => {
            const moodDate = new Date(m.date);
            return moodDate.getMonth() === currentMonth && moodDate.getFullYear() === currentYear;
        });

        if (currentMonthMoods.length > 0) {
            const totalValue = currentMonthMoods.reduce((sum, m) => sum + emojis[m.mood].value, 0);
            const maxPossibleValue = currentMonthMoods.length * 5; // Max value is 5
            const percentage = (totalValue / maxPossibleValue) * 100;
            setHappinessPercentage(percentage.toFixed(0));
        } else {
            setHappinessPercentage(0);
        }

    }, [moods, todayString]);

    const handleMoodSelect = (moodKey) => {
        if (todayMood) return; // Already logged today

        const newMoodEntry = { date: todayString, mood: moodKey };
        setMoods(prevMoods => [...prevMoods, newMoodEntry]);
        setTodayMood(moodKey);
    };

    return (
        <div className="page-content mood-tracker-page">
            <header className="mood-tracker-header">
                <h1>Проследяване на настроението</h1>
                <p>Как се чувстваш днес? (Можеш да избереш само веднъж на ден)</p>
            </header>
            
            <div className="mood-selection">
                {Object.keys(emojis).map(key => (
                    <button 
                        key={key}
                        className={`mood-emoji-btn ${todayMood === key ? 'selected' : ''} ${todayMood ? 'disabled' : ''}`}
                        onClick={() => handleMoodSelect(key)}
                        disabled={!!todayMood}
                    >
                        {emojis[key].emoji}
                    </button>
                ))}
            </div>

            {todayMood && <p className="confirmation-message">Твоето настроение за днес е запазено!</p>}

            <div className="monthly-summary">
                <h2>Щастие за текущия месец</h2>
                <div className="happiness-bar-container">
                    <div className="happiness-bar" style={{ width: `${happinessPercentage}%` }}>
                        {happinessPercentage}%
                    </div>
                </div>
            </div>

            <div className="history-section">
                <button onClick={() => setHistoryModalOpen(true)} className="history-btn">
                    Виж история на настроенията
                </button>
            </div>

            <MoodHistoryModal 
                isOpen={historyModalOpen}
                onClose={() => setHistoryModalOpen(false)}
                moods={moods}
                emojis={emojis}
            />
        </div>
    );
};

export default MoodTrackerPage;
