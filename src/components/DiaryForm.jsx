import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './DiaryForm.css';

function DiaryForm({ addEntry }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

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
    // Cleanup the object URL on unmount
    return () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    }
  }, [previewUrl]);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Clean up previous preview
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    }

    if (!selectedFile) {
        setFile(null);
        setFileName('');
        return;
    }

    setFileName(selectedFile.name);

    // Create a preview for image files
    if (selectedFile.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
    }

    const reader = new FileReader();

    if (selectedFile.type.startsWith('image/')) {
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const resizedDataUrl = canvas.toDataURL(selectedFile.type, 0.7);

          setFile({
            name: selectedFile.name,
            type: selectedFile.type,
            dataUrl: resizedDataUrl,
          });
        };
        img.src = event.target.result;
      };
    } else {
      reader.onloadend = () => {
        setFile({
          name: selectedFile.name,
          type: selectedFile.type,
          dataUrl: reader.result,
        });
      };
    }
    
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setFileName('');
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    }
    // Reset the file input
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
    addEntry({ text, file, date: new Date().toISOString() });
    setText('');
    setFile(null);
    setFileName('');
    setShowEmojiPicker(false);
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    }
    e.target.reset();
  };

  return (
    <div className="diary-form-container">
      <form onSubmit={handleSubmit} className="diary-form">
        <div className="textarea-container">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Какво се случи днес?"
            rows="6"
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
                <button type="button" className="remove-image-button" onClick={handleRemoveImage}>&times;</button>
            </div>
        )}

        <div className="form-actions">
            <div class="attachment-buttons">
                <button type="button" className="icon-button" onClick={() => cameraInputRef.current.click()}>
                    📷
                </button>
                <button type="button" className="icon-button" onClick={() => fileInputRef.current.click()}>
                    🖼️
                </button>
                <input type="file" accept="image/*" capture="user" ref={cameraInputRef} onChange={handleFileChange} style={{display: 'none'}} />
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{display: 'none'}} />
            </div>
          {fileName && !previewUrl && <span className="file-name">{fileName}</span>}
          <button type="submit">Добави запис</button>
        </div>
      </form>
    </div>
  );
}

export default DiaryForm;
