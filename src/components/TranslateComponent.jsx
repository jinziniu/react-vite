import React, { useState } from 'react';

const TranslateComponent = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('en');

  const translateText = async () => {
    const apiKey = '';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const data = {
      q: text,
      target: language
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        setTranslatedText(result.data.translations[0].translatedText);
      } else {
        console.error('Error translating text:', response.statusText);
      }
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div>
      <h2>Text Translator</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <div>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          {/* Add more languages as needed */}
        </select>
        <button onClick={translateText}>Translate</button>
      </div>
      <div>
        <h3>Translated Text</h3>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default TranslateComponent;
