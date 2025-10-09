import React, { useState } from 'react';

const moods = ['😊', '😄', '😐', '😕', '😢', '😠'];

function MoodTracker({ addMood }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    addMood({ mood, date: new Date().toISOString() });
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h2>Как се чувстваш днес?</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        {moods.map((mood, index) => (
          <span
            key={index}
            style={{
              fontSize: '2rem',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '50%',
              backgroundColor: selectedMood === mood ? '#5a67d8' : 'transparent',
              color: selectedMood === mood ? 'white' : 'black',
            }}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </span>
        ))}
      </div>
      {selectedMood && <p>Днешното ти настроение е: {selectedMood}</p>}
    </div>
  );
}

export default MoodTracker;
