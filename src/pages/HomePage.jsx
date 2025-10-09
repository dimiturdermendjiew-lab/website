import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const quotes = [
  "Най-добрият начин да предскажеш бъдещето е да го създадеш.",
  "Успехът не е окончателен, провалът не е фатален: смелостта да продължиш е това, което има значение.",
  "Вярвай, че можеш и си на половината път.",
  "Единственият начин да вършиш страхотна работа е да обичаш това, което правиш.",
  "Бъдещето принадлежи на тези, които вярват в красотата на своите мечти."
];

function HomePage() {
  const [dailyQuote, setDailyQuote] = useState('');

  useEffect(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % quotes.length;
    setDailyQuote(quotes[quoteIndex]);
  }, []);

  return (
    <div className="page-content home-page">
      <header className="hero-section">
        <h1>Добре дошли в "Дневникът на един студент"</h1>
        <p className="subtitle">Вашето лично пространство за организация, размисъл и растеж.</p>
        <Link to="/diary" className="cta-button">Започнете да пишете</Link>
      </header>

      <section className="features-grid">
        <Link to="/diary" className="feature-card">
          <h3>📝 Моят Дневник</h3>
          <p>Записвайте своите мисли, идеи и преживявания.</p>
        </Link>
        <Link to="/calendar" className="feature-card">
          <h3>📅 Календар и събития</h3>
          <p>Организирайте задачите и ангажиментите си.</p>
        </Link>
        <Link to="/mood-tracker" className="feature-card">
          <h3>😊 Настроение</h3>
          <p>Проследявайте емоционалното си състояние.</p>
        </Link>
      </section>

      <footer className="inspirational-quote">
        <p>"{dailyQuote}"</p>
        <cite>- Димитър Георгиев</cite>
      </footer>
    </div>
  );
}

export default HomePage;
