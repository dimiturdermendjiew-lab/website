import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './DiaryForm.css';

function DiaryForm({ addEntry, selectedDate }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    setText('');
    handleRemoveImage();
  }, [selectedDate]);

  const onEmojiClick = (emojiObject) => {
    setText(prevText => prevText + emojiObject.emoji);
  };

  useEffect(() => {
    function handleClickOutside(event) {
        const emojiButton = document.querySelector(".emoji-button");
        if (emojiButton && emojiButton.contains(event.target)) {
            return;
        }

        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            setShowEmojiPicker(false);
        }
    }

    if (showEmojiPicker) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [showEmojiPicker]);

 useEffect(() => {
    return () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    }
  }, [previewUrl]);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }

    if (selectedFile && selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
    } else {
        setFile(null);
        setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    }
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    if (cameraInputRef.current) {
        cameraInputRef.current.value = "";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    addEntry({ text, file }); 
    setText('');
    handleRemoveImage();
    setShowEmojiPicker(false);
  };

  return (
    <div className="diary-form-container">
      <form onSubmit={handleSubmit} className="diary-form">
        <div className="textarea-container">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Какво се случи днес?"
            rows={4}
          ></textarea>
          <button 
            type="button" 
            className="emoji-button" 
            onClick={() => setShowEmojiPicker(prev => !prev)}
          >
            😊
          </button>
           {showEmojiPicker && (
            <div className="emoji-picker-container" ref={emojiPickerRef}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        {previewUrl && (
            <div className="image-preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
                <button type="button" className="remove-image-button" onClick={handleRemoveImage} title="Премахни изображението">🗑️</button>
            </div>
        )}

        <div className="form-actions">
            <div className="attachment-buttons">
                <button type="button" className="icon-button" title="Take Photo" onClick={() => cameraInputRef.current.click()}>
                    📷
                </button>
                <button type="button" className="icon-button" title="Attach Image" onClick={() => fileInputRef.current.click()}>
                    🖼️
                </button>
                <input type="file" accept="image/*" capture="user" ref={cameraInputRef} onChange={handleFileChange} style={{display: 'none'}} />
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{display: 'none'}} />
            </div>
          <button type="submit">Добави запис</button>
        </div>
      </form>
    </div>
  );
}

export default DiaryForm;
