import React, { useState } from 'react';
import './Buttons.css'; // This imports the CSS styles

const ButtonContainer = () => {

    const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

    const handleHelpClick = () => {
      setIsHelpModalVisible(true); // Show the help modal
    };
  
    const handleCloseHelpModal = () => {
      setIsHelpModalVisible(false); // Hide the help modal
    };

  const handleCheckClick = () => {
    // Logic for check crossword button
  };

  const handleEraseClick = () => {
    // Logic for erase crossword button
  };

  const handleSendClick = () => {
    // Logic for send reply button
  };

  const handleTarkistaSanaClick = () => {
    // Logic for checking solution word
  };

  return (
    <div className="button-container">
      <button id="helpButton" className="help-button" onClick={handleHelpClick}>Ohjeet</button>
      {/* ... other buttons */}

      {/* Help Modal */}
      {isHelpModalVisible && (
        <div className="modal" onClick={handleCloseHelpModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseHelpModal}>&times;</span>
            {/* Modal content goes here */}
            <p>Help modal content...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonContainer;