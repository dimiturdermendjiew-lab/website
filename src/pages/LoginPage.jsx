import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && surname.trim()) {
      const fullName = `${name.trim()} ${surname.trim()}`;
      onLogin(fullName);
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Добре дошли!</h1>
        <p className="login-subtitle">Моля, въведете името и фамилията си, за да продължите</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Име"
            className="login-input"
            required
          />
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Фамилия"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">Вход</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
