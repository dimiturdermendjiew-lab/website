import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DiaryPage from './pages/DiaryPage';
import CalendarPage from './pages/CalendarPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Начало</Link>
            </li>
            <li>
              <Link to="/diary">Дневник</Link>
            </li>
            <li>
              <Link to="/calendar">Календар</Link>
            </li>
            <li>
              <Link to="/mood">Настроение</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/mood" element={<MoodTrackerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
