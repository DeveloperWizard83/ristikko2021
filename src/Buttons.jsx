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
    // Temporarily hide elements you don't want to capture
    document.querySelectorAll('.non-printable').forEach(el => el.style.display = 'none');
  
    // Set options for html2canvas
    const options = {
      scale: 1,
      useCORS: true,
      logging: true,
      allowTaint: false,
      width: window.innerWidth,
      height: window.innerHeight + 900,
      windowHeight: document.documentElement.offsetHeight
    };
  
    html2canvas(document.body, options).then(canvas => {
      // Show elements back
      document.querySelectorAll('.non-printable').forEach(el => el.style.display = '');
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
  
      // Calculate the PDF width and height
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasAspectRatio = canvas.height / canvas.width;
      const pdfAspectRatio = pdfHeight / pdfWidth;
  
      let finalPdfWidth, finalPdfHeight;
  
      // Adjust width and height to maintain the aspect ratio
      if (canvasAspectRatio > pdfAspectRatio) {
        finalPdfHeight = pdfHeight;
        finalPdfWidth = pdfHeight / canvasAspectRatio;
      } else {
        finalPdfWidth = pdfWidth;
        finalPdfHeight = canvasAspectRatio * pdfWidth;
      }
  
      pdf.addImage(imgData, 'PNG', 0, 0, finalPdfWidth, finalPdfHeight);
      pdf.save('download.pdf');
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