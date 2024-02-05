import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Buttons.css'; // This imports the CSS styles


const solution = { 1: 'L',2: 'A',3: 'A',4: 'T',5: 'O',6: 'I',7: 'T',
8: 'T',9: 'A',10: 'A',11: 'A',12: 'L',13: 'L',14: 'U',16: 'T',17: 'A',18: 'A',19: 'I',
20: 'N',21: 'H',22: 'A',23: 'K',24: 'U',26: 'A',27: 'S',28: 'T',29: 'O',30: 'N',
31: 'J',32: 'O',33: 'U',34: 'L',35: 'U',36: 'L',37: 'A',38: 'U',39: 'L',40: 'U',
41: 'A',42: 'S',43: 'I',44: 'A',46: 'I',47: 'N',48: 'T',49: 'I',50: 'T',
51: 'K',52: 'A',53: 'H',54: 'T',55: 'I',56: 'A',59: 'P', 61: 'O',63: 'M',67: 'A',68: 'S',
69: 'U',70: 'T',71: 'R',72: 'A',73: 'I',74: 'T',76: 'A',77: 'P',78: 'U',79: 'R',80: 'I',
81: 'T',82: 'I',83: 'N',84: 'O',86: 'T',87: 'I',88: 'N',89: 'K',90: 'E',
91: 'I',92: 'T',93: 'E',94: 'R',95: 'O',96:'I',97: 'N',98: 'N',99: 'I', 100: 'T',
101: 'T',102: 'O',103: 'N',104: 'I',106: 'K',107: 'A',108: 'A',109: 'T',110: 'O'
 
  // Add all other cell IDs and their correct letters
};

const ButtonContainer = ({ onEraseClick, gridContentRef, selectedItemId}) => {

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

  const handleKirjainClick = () => {
    if (!selectedItemId) {
      alert('Et ole valinnut ruutua.');
      return;
    }
  
    // Directly fetch the correct letter from the solution object
    const correctLetter = solution[selectedItemId];
  
    // Check if the solution has an entry for the selectedItemId
    if (correctLetter) {
      alert(`Tämän kohdan kirjain on ${correctLetter}`);
    } else {
      // This message can be shown if the selected grid item does not have a corresponding letter in the solution,
      // which could be the case for empty spaces or non-letter cells in the crossword.
      alert('This cell does not contain a letter in the solution.');
    }
  };

  const tarkistaRistikkoClick = () => {
    let correctCount = 0;
    let totalCount = Object.keys(solution).length;
  
    for (let itemId in solution) {
      if (solution[itemId] === (gridContentRef.current[itemId] || '').toUpperCase()) {
        correctCount++;
      }
    }
  
    let correctnessPercentage = (correctCount / totalCount) * 100;
    alert(`Your crossword is ${correctnessPercentage.toFixed(2)}% correct.`);
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
      <button onClick={tarkistaRistikkoClick}>Tarkista ristikko</button>
      {/* Add the download button */}
      <button onClick={handleKirjainClick}>Anna Kirjain</button>
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