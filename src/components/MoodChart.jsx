import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function MoodChart({ moods }) {
  const moodCounts = moods.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: 'Разпределение на настроенията',
        data: Object.values(moodCounts),
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)', // 😊
          'rgba(75, 192, 192, 0.7)', // 😄
          'rgba(153, 102, 255, 0.7)',// 😐
          'rgba(255, 159, 64, 0.7)', // 😕
          'rgba(54, 162, 235, 0.7)',  // 😢
          'rgba(255, 99, 132, 0.7)',   // 😠
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '2rem auto' }}>
        <h2>Статистика за последния месец</h2>
        {moods.length > 0 ? <Pie data={data} /> : <p>Все още няма данни за показване.</p>}
    </div>
  );
}

export default MoodChart;
