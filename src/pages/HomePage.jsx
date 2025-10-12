import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage({ user }) {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <header className="hero-section">
                <h1 className="hero-title">Добре дошъл/ла, <span>{user}!</span></h1>
                <p className="hero-subtitle">Вашето лично пространство за организация, размисъл и растеж.</p>
                <button onClick={() => navigate('/diary')} className="hero-button">
                    Започни да пишеш своята история
                </button>
            </header>

            <main className="features-section">
                <div className="features-grid">
                    <Link to="/diary" className="feature-card">
                        <span className="emoji">📖</span>
                        <h2>Моят дневник</h2>
                        <p>Записвайте вашите мисли, идеи и преживявания.</p>
                    </Link>
                    <Link to="/calendar" className="feature-card">
                        <span className="emoji">📅</span>
                        <h2>Календар</h2>
                        <p>Организирайте задачи, изпити и важни събития.</p>
                    </Link>
                    <Link to="/mood" className="feature-card">
                        <span className="emoji">😊</span>
                        <h2>Настроение</h2>
                        <p>Проследявайте как се чувствате всеки ден.</p>
                    </Link>
                </div>
            </main>

            <footer className="quote-section">
                <blockquote className="quote-text">
                    "Вярвай в себе си и в това, което си. Знай, че вътре в теб има нещо, което е по-голямо от всяко препятствие."
                </blockquote>
                <cite className="quote-author">/Димитър Георгиев/</cite>
            </footer>
        </div>
    );
}

export default HomePage;
