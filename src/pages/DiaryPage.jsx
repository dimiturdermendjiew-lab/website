import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DiaryList from '../components/DiaryList';
import DiaryForm from '../components/DiaryForm';
import { get, set } from 'idb-keyval';
import './DiaryPage.css';

function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    get('diaryEntries').then((storedEntries) => {
      if (storedEntries) {
        setEntries(storedEntries);
      }
    });
  }, []);

  useEffect(() => {
    set('diaryEntries', entries);
  }, [entries]);

  const addEntry = (entry) => {
    const newEntry = { ...entry, date: selectedDate.toISOString() };
    setEntries([newEntry, ...entries]);
  };

  const deleteEntry = (indexToDelete) => {
    if (window.confirm('Наистина ли искате да изтриете този запис?')) {
        setEntries(entries.filter((_, index) => index !== indexToDelete));
    }
  };

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="page-content diary-page">
      <h1>Моят Дневник</h1>
      <div className="diary-content">
        <div className="calendar-container">
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
            />
        </div>
        <div className="entries-container">
            <DiaryForm addEntry={addEntry} />
            <DiaryList entries={filteredEntries} deleteEntry={deleteEntry} />
        </div>
      </div>
    </div>
  );
}

export default DiaryPage;
