import React from 'react';
import './DiaryList.css';

function DiaryList({ entries, deleteEntry }) {

  const handleShare = async (entry) => {
    if (navigator.share) {
      try {
        let shareText = entry.text;

        await navigator.share({
          title: `Запис от дневника - ${new Date(entry.date).toLocaleDateString('bg-BG')}`,
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Функцията за споделяне не се поддържа от този браузър.');
    }
  };

  return (
    <div className="diary-list">
      {entries.length === 0 ? (
        <div className="empty-state">
          <h3>Няма записи за тази дата</h3>
          <p>Можете да добавите нов запис от формата по-горе или да изберете друга дата от календара.</p>
        </div>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="diary-card">
            <div className="card-header">
              <span className="card-date">{new Date(entry.date).toLocaleString('bg-BG', { dateStyle: 'long', timeStyle: 'short' })}</span>
              <div className="card-actions">
                <button onClick={() => handleShare(entry)} className="share-btn" title="Сподели">✈️</button>
                <button onClick={() => deleteEntry(entry)} className="delete-btn" title="Изтрий">🗑️</button>
              </div>
            </div>
            <div className="card-body">
                <p className="card-text"><pre>{entry.text}</pre></p>
                {entry.fileDataUrl && <img src={entry.fileDataUrl} alt="Attached file" className="attached-image" />}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DiaryList;
