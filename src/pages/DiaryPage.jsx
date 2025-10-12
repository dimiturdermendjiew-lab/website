import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DiaryList from '../components/DiaryList';
import DiaryForm from '../components/DiaryForm';
import './DiaryPage.css';

function DiaryPage() {
  const navigate = useNavigate();
  const [allEntries, setAllEntries] = useState(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(allEntries));
  }, [allEntries]);

  useEffect(() => {
    const filtered = allEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === selectedDate.toDateString();
    });
    setFilteredEntries(filtered);
  }, [selectedDate, allEntries]);

  const addEntry = ({ text, file }) => {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newEntry = {
                id: new Date().getTime(),
                text: text,
                date: selectedDate.toISOString(),
                fileDataUrl: e.target.result, // Запазваме данните на файла
            };
            setAllEntries([...allEntries, newEntry]);
        };
        reader.readAsDataURL(file);
    } else {
        const newEntry = {
            id: new Date().getTime(),
            text: text,
            date: selectedDate.toISOString(),
            fileDataUrl: null,
        };
        setAllEntries([...allEntries, newEntry]);
    }
  };

  const deleteEntry = (entryToDelete) => {
    if (!window.confirm('Наистина ли искате да изтриете този запис?')) return;
    setAllEntries(allEntries.filter(entry => entry.id !== entryToDelete.id));
  };

  return (
    <div className="page-content diary-page">
      <button className="home-button" onClick={() => navigate('/')}>🏠</button>
      <h1>Моят Дневник</h1>
      <div className="diary-content">
        <div className="calendar-container">
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={({ date, view }) => {
                    if (view === 'month') {
                        if (allEntries.find(entry => new Date(entry.date).toDateString() === date.toDateString())) {
                            return 'has-entry';
                        }
                    }
                }}
            />
        </div>
        <div className="entries-container">
            <p className="selected-date-display">Записи за: {selectedDate.toLocaleDateString('bg-BG')}</p>
            <DiaryForm addEntry={addEntry} selectedDate={selectedDate} />
            <DiaryList entries={filteredEntries} deleteEntry={deleteEntry} />
        </div>
      </div>
    </div>
  );
}

export default DiaryPage;
