import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// Pages & Components
import HomePage from './pages/HomePage';
import DiaryPage from './pages/DiaryPage';
import CalendarPage from './pages/CalendarPage';
import MoodPage from './pages/MoodPage';
import LoginPage from './pages/LoginPage';
import './App.css';

const Navigation = ({ user, onLogout }) => {
    if (!user) return null;

    return (
        <nav>
            <ul>
                <li><Link to="/">Начало</Link></li>
                <li><Link to="/diary">Дневник</Link></li>
                <li><Link to="/calendar">Календар</Link></li>
                <li><Link to="/mood">Настроение</Link></li>
                <li><button onClick={onLogout} className="logout-button">Изход</button></li>
            </ul>
        </nav>
    );
};

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('userName');
  });

  useEffect(() => {
    if (user) {
        localStorage.setItem('userName', user);
    } else {
        localStorage.removeItem('userName');
    }
  }, [user]);

  const handleLogin = (userName) => {
    setUser(userName);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div>
        <Navigation user={user} onLogout={handleLogout} />
        <hr />
        <Routes>
          {!user ? (
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          ) : null}
          <Route 
            path="/" 
            element={user ? <HomePage user={user} /> : <Navigate to="/login" />}
          />
          <Route 
            path="/diary" 
            element={user ? <DiaryPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/calendar" 
            element={user ? <CalendarPage /> : <Navigate to="/login" />}
          />
          <Route 
            path="/mood" 
            element={user ? <MoodPage /> : <Navigate to="/login" />}
          />
          {/* Ако потребителят не е логнат, всички пътища ще го пренасочат към /login */}
          <Route 
            path="*" 
            element={<Navigate to={user ? "/" : "/login"} />}
           />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
