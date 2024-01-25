// CustomKeyboard.js
import React from 'react';
import './CustomKeyboard.css'; // Assuming you have separate CSS for the keyboard

const CustomKeyboard = ({ onKeyPress }) => {
  // Characters to include in the keyboard, add more as needed
  const chars = 'abcdefghijklmnopqrstuvwxyzåäö'.toUpperCase().split('');

  const handleClick = (char) => {
    // Call the passed in onKeyPress function with the character
    onKeyPress(char);
  };

  return (
    <div className="custom-keyboard">
      {chars.map(char => (
        <button key={char} onClick={() => handleClick(char)}>{char}</button>
      ))}
      <button onClick={() => handleClick('delete')}>Delete</button>
    </div>
  );
};

export default CustomKeyboard;