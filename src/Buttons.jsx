import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Buttons.css'; // This imports the CSS styles

const ButtonContainer = ({ onEraseClick, gridContentRef }) => {

    const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

    const handleHelpClick = () => {
      setIsHelpModalVisible(true); // Show the help modal
    };
  
    const handleCloseHelpModal = () => {
      setIsHelpModalVisible(false); // Hide the help modal
    };

    const handleCheckClick = () => {
      // Assuming staticNumberMapping's order corresponds to the word "MITTAUS"
      // and that gridContentRef.current holds the current letters keyed by itemId
      const correctWord = "KOSTEA";
      const letterPositions = [23, 29, 42, 70, 93, 107]; // Ids for "KOSTEA"
      let formedWord = '';

      for (let pos of letterPositions) {
          formedWord += (gridContentRef.current[pos] || '');
      }

      if (formedWord.toUpperCase() === correctWord) {
          alert("Hienoa, vastaus on oikein"); // Using alert for simplicity
      } else {
          alert("Väärin, yritä uudestaan");
      }
  };

  const handleEraseClick = () => {
    if (onEraseClick) {
        onEraseClick(); // Call the function passed down from the parent component
    }
};

  const handleSendClick = () => {
    // Logic for send reply button
  };

  const handleTarkistaSanaClick = () => {
    // Logic for checking solution word
  };

  const handleDownloadClick = () => {
    // Temporarily adjust styles for capture
    const originalStyles = {
      overflow: document.querySelector('.canvas').style.overflow,
      position: document.querySelector('.background').style.position,
      transform: document.querySelector('.background').style.transform
    };
  
    // Adjust styles for capture
    document.querySelector('.canvas').style.overflow = 'visible';
    document.querySelector('.background').style.position = 'static';
    document.querySelector('.background').style.transform = 'none';
  
    const crosswordContainerElement = document.querySelector('.canvas');
  
    // Use html2canvas to capture the crossword container
    html2canvas(crosswordContainerElement, {
      scale: 1,
      logging: true,
      onclone: (document) => {
        // Modify cloned document styles here if necessary
      }
    }).then(capturedCanvas => {
      // Restore original styles after capture
      document.querySelector('.canvas').style.overflow = originalStyles.overflow;
      document.querySelector('.background').style.position = originalStyles.position;
      document.querySelector('.background').style.transform = originalStyles.transform;
  
      const imgData = capturedCanvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
  
      // Add the captured canvas to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('download.pdf');
    }).catch(error => {
      console.error('Error generating PDF: ', error);
    });
  };
  
  return (
    <div className="button-container">
      <button id="helpButton" className="help-button non-printable" onClick={handleHelpClick}>Ohjeet</button>
      <button onClick={handleCheckClick}>Tarkista Sana</button>
      {/* Add the download button */}
      <button id="eraseButton" className="erase-button non-printable" onClick={handleEraseClick}>Tyhjennä Ristikko</button>
      <button id="downloadButton" className="download-button non-printable" onClick={handleDownloadClick}>Lataa sivu</button>
      {/* ... other buttons */}
      {/* Help Modal */}
      {isHelpModalVisible && (
        <div className="modal" onClick={handleCloseHelpModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseHelpModal}>&times;</span>
            <h2>Kirjoittaminen</h2>
    <p>Valitse ruutu ja kirjoitussuunta ja voit aloittaa kirjoittamisen. Kirjoitussuuntaa voit vaihtaa painamalla valittua ruutua. Kirjaimia voi poistaa peruutus(backspace) näppäimellä. Jos ristikko näyttää oudolta, niin tarkista että selaimen zoom taso on 100% </p>
    <h2>Ristikon tallennus</h2>
    <p>Ristikko tallentuu automaattisesti selaimen muistiin jokaisen muutoksen jälkeen. Kun ristikkoon palaa myöhemmin lataa se automaattisesti pelin siitä kohtaa johon se jäi. 
        Selaimen muistien tyhjennys voi hävittää kirjaimet ristikosta.
    </p>
    <h2>Ristikon ratkaisu</h2>
    <p>Kun olet täyttänyt ristikon voit tarkistaa "Tarkista ristikko" -napilla saitko ratkaistua ristikon oikein.
    </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonContainer;