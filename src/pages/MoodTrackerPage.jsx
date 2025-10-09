import React, { useState, useEffect } from 'react';
import MoodTracker from '../components/MoodTracker';
import MoodChart from '../components/MoodChart';

function MoodTrackerPage() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const storedMoods = JSON.parse(localStorage.getItem('moods'));
    if (storedMoods) {
      setMoods(storedMoods);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moods', JSON.stringify(moods));
  }, [moods]);

  const addMood = (mood) => {
    const today = new Date().toLocaleDateString('bg-BG');
    const newMoods = moods.filter(m => new Date(m.date).toLocaleDateString('bg-BG') !== today);
    setMoods([{ ...mood, date: new Date().toISOString() }, ...newMoods]);
  };

  // Filter moods for the last 30 days for the chart
  const last30DaysMoods = moods.filter(mood => {
      const moodDate = new Date(mood.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return moodDate >= thirtyDaysAgo;
  })

  return (
    <div className="page-content">
      <h1>Проследяване на настроението</h1>
      <MoodTracker addMood={addMood} />
      <MoodChart moods={last30DaysMoods} />
    </div>
  );
}

export default MoodTrackerPage;
