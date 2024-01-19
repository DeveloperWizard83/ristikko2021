import React from 'react';
import './CustomKeyboard.css';

function CustomKeyboard({ onKeyPress, onZoomIn, onZoomOut }) {
    const keys = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö', '<-'
    ];

    return (
        <div className="custom-keyboard">
            

            {keys.map(key => (
                <button className="key" key={key} onClick={() => onKeyPress(key)}>
                    {key}
                </button>
            ))}

           
        </div>
    );
}

export default CustomKeyboard;
