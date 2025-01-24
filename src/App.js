import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setIsValidUrl(validateURL(value));
  };

  // Improved URL validation
  const validateURL = (url) => {
    try {
      const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
      new URL(formattedUrl);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <input 
        type="text" 
        placeholder="Enter a valid URL (e.g. https://example.com)" 
        value={input} 
        onChange={handleInputChange} 
      />
      <div className="qr-container">
        {isValidUrl ? (
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(input.startsWith('http') ? input : `https://${input}`)}`} 
            alt="QR Code"
          />
        ) : input && (
          <p className="error">Please enter a valid URL.</p>
        )}
      </div>
    </div>
  );
}

export default App;