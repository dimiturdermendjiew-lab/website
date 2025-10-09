import React, { useState, useEffect } from 'react';
import './EventModal.css';

const categories = {
  university: { name: 'Университет', color: '#3b5998' },
  school: { name: 'Училище', color: '#8b9dc3' },
  extracurricular: { name: 'Извънкласна дейност', color: '#f7f7f7', textColor: '#333' },
  sports: { name: 'Спортна дейност', color: '#ff9f40' },
  love: { name: 'Любовен живот', color: '#d9363e' },
  work: { name: 'Работа', color: '#55c57a' },
  personal: { name: 'Лични задачи', color: '#ffeb3b', textColor: '#333' },
  health: { name: 'Здраве', color: '#ff7f7f' },
};

function EventModal({ isOpen, onClose, onSave, onDelete, event }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(Object.keys(categories)[0]);

  useEffect(() => {
      if (event) {
        setTitle(event.title || '');
        setCategory(event.category || Object.keys(categories)[0]);
      }
  }, [event]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSave({ title, category });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{event && event.id ? 'Редактирай събитие' : 'Добави събитие'}</h2>
          <input
            type="text"
            placeholder="Име на събитието"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.keys(categories).map(key => (
              <option key={key} value={key}>{categories[key].name}</option>
            ))}
          </select>
          <div className="modal-actions">
            <button type="submit" className="save-btn">Запази</button>
            {event && event.id && (
                <button type="button" onClick={onDelete} className="delete-btn">Изтрий</button>
            )}
            <button type="button" onClick={onClose} className="cancel-btn">Отказ</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
