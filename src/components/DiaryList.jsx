import React from 'react';
import './DiaryList.css'; // Ще създадем този файл за стилове

function DiaryList({ entries, deleteEntry }) {

  const handleShare = async (entry) => {
    if (navigator.share) {
      try {
        let fullText = entry.text;
        if (entry.file) {
          // Note: Web Share API can't directly share data URLs.
          // We are sharing the text and mentioning the attachment.
          fullText += `\n\n(Прикачен файл: ${entry.file.name})`;
        }

        await navigator.share({
          title: `Запис от дневника - ${new Date(entry.date).toLocaleDateString('bg-BG')}`,
          text: fullText,
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
          <h3>Все още нямате записи</h3>
          <p>Започнете, като напишете първия си запис в дневника.</p>
        </div>
      ) : (
        entries.map((entry, index) => (
          <div key={index} className="diary-card">
            <div className="card-header">
              <span className="card-date">{new Date(entry.date).toLocaleString('bg-BG', { dateStyle: 'long', timeStyle: 'short' })}</span>
              <div className="card-actions">
                <button onClick={() => handleShare(entry)} className="share-btn">✈️</button>
                <button onClick={() => deleteEntry(index)} className="delete-btn">🗑️</button>
              </div>
            </div>
            <div className="card-body">
                <p className="card-text">{entry.text}</p>
                {entry.file && (
                <div className="card-attachment">
                    {entry.file.type.startsWith('image/') ? (
                    <img src={entry.file.dataUrl} alt={entry.file.name} className="attached-image" />
                    ) : (
                    <a href={entry.file.dataUrl} download={entry.file.name} className="attached-file-link">
                        📎 {entry.file.name}
                    </a>
                    )}
                </div>
                )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DiaryList;
