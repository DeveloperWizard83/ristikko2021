import React from 'react';
import './CustomKeyboard.css';

function CustomKeyboard({ onKeyPress }) {
    const keys = ['A', 'B', 'C', 'D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','X','Y','Z','Å','Ä','Ö', 'Poista kirjain'];

    return (
        <div className="custom-keyboard">
            {keys.map(key => (
                <button key={key} onClick={() => onKeyPress(key)}>
                    {key}
                </button>
            ))}
        </div>
    );
}


export default CustomKeyboard;