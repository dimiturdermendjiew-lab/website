import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodHistoryModal from '../components/MoodHistoryModal';
import HappinessHistoryModal from '../components/HappinessHistoryModal';
import './MoodPage.css';

const moods = [
    { emoji: '😭', value: 1, label: 'Много тъжен' },
    { emoji: '😟', value: 2, label: 'Тъжен' },
    { emoji: '😐', value: 3, label: 'Неутрален' },
    { emoji: '😊', value: 4, label: 'Спокоен' },
    { emoji: '😄', value: 5, label: 'Щастлив' },
    { emoji: '🤩', value: 6, label: 'Много щастлив' },
];

function MoodPage() {
    const navigate = useNavigate();
    const [moodsData, setMoodsData] = useState(() => {
        const savedMoods = localStorage.getItem('moodsData');
        return savedMoods ? JSON.parse(savedMoods) : [];
    });
    const [selectedMood, setSelectedMood] = useState(null);
    const [isVotedToday, setIsVotedToday] = useState(false);
    const [isMoodHistoryOpen, setIsMoodHistoryOpen] = useState(false);
    const [isHappinessHistoryOpen, setIsHappinessHistoryOpen] = useState(false);

    useEffect(() => {
        const lastVoteDate = localStorage.getItem('lastVoteDate');
        const today = new Date().toISOString().split('T')[0];
        
        if (lastVoteDate === today) {
            setIsVotedToday(true);
            const todayMood = moodsData.find(mood => mood.date === today);
            if (todayMood) {
                const moodObject = moods.find(m => m.value === todayMood.value);
                setSelectedMood(moodObject);
            }
        } else {
            setIsVotedToday(false);
            setSelectedMood(null);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('moodsData', JSON.stringify(moodsData));
    }, [moodsData]);

    const handleMoodSelect = (mood) => {
        if (!isVotedToday) {
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem('lastVoteDate', today);
            setSelectedMood(mood);
            const newMoodEntry = { date: today, value: mood.value };
            setMoodsData([...moodsData, newMoodEntry]);
            setIsVotedToday(true);
        }
    };

    return (
        <div className="mood-container">
            <button className="home-button" onClick={() => navigate('/')}>🏠</button>
            <h1 className="mood-title">
                {isVotedToday ? 'Вече избра настроение за днес. Върни се утре!' : 'Как се чувстваш днес?'}
            </h1>
            <div className="mood-selector">
                {moods.map((mood) => (
                    <button
                        key={mood.value}
                        className={`mood-option ${selectedMood?.value === mood.value ? 'selected' : ''} ${isVotedToday ? 'disabled' : ''}`}
                        onClick={() => handleMoodSelect(mood)}
                        disabled={isVotedToday}
                    >
                        <span className="mood-emoji">{mood.emoji}</span>
                        <span className="mood-label">{mood.label}</span>
                    </button>
                ))}
            </div>

            <div className="buttons-container">
                <button className="history-button" onClick={() => setIsMoodHistoryOpen(true)}>
                    Настроение ти за този месец
                </button>
                <button className="history-button happiness-history-btn" onClick={() => setIsHappinessHistoryOpen(true)}>
                    Историята на настроението ти
                </button>
            </div>

            {isMoodHistoryOpen && (
                <MoodHistoryModal
                    onClose={() => setIsMoodHistoryOpen(false)}
                    moodsData={moodsData}
                    moodEmojis={moods}
                />
            )}

            {isHappinessHistoryOpen && (
                <HappinessHistoryModal
                    onClose={() => setIsHappinessHistoryOpen(false)}
                    moodsData={moodsData}
                />
            )}
        </div>
    );
}

export default MoodPage;
