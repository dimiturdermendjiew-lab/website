import React, { useState } from 'react';
import './EventModal.css';

const EventModal = ({ isOpen, onClose, onAddEvent }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('lecture'); // Default category
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:30');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEvent({ title, category, startTime, endTime });
        setTitle(''); // Clear input after adding
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content event-modal" onClick={e => e.stopPropagation()}>
                <h2>Добави събитие</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Име на събитието"
                        required
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="lecture">Лекция</option>
                        <option value="exercise">Упражнение</option>
                        <option value="exam">Изпит</option>
                        <option value="task">Задача</option>
                        <option value="homework">Домашна работа</option> {/* Added homework */}
                        <option value="meeting">Среща</option>
                    </select>
                    <div className="time-inputs">
                        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                        <span>-</span>
                        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                    </div>
                    <button type="submit" className="add-event-btn">Добави</button>
                </form>
                <button onClick={onClose} className="close-btn">Затвори</button>
            </div>
        </div>
    );
};

export default EventModal;
