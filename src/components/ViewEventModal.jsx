import React from 'react';
import './ViewEventModal.css'; // We will create this file next
import moment from 'moment';

const ViewEventModal = ({ isOpen, onClose, event, onDelete }) => {
    if (!isOpen || !event) return null;

    const handleDelete = () => {
        onDelete(event);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content view-event-modal" onClick={e => e.stopPropagation()}>
                <h2>{event.title}</h2>
                <p><strong>Категория:</strong> {event.category}</p>
                <p><strong>Начало:</strong> {moment(event.start).format('LLL')}</p>
                <p><strong>Край:</strong> {moment(event.end).format('LLL')}</p>
                <div className="modal-actions">
                    <button onClick={handleDelete} className="delete-btn">Изтрий</button>
                    <button onClick={onClose} className="close-btn">Затвори</button>
                </div>
            </div>
        </div>
    );
};

export default ViewEventModal;
