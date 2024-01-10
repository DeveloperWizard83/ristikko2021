import React, { useState } from 'react';
import './CrosswordGrid.css';

function CrosswordGrid() {
    const [selectedCell, setSelectedCell] = useState(null);
    const [selectedDirection, setSelectedDirection] = useState('horizontal');

    const isSpecialCell = (cellId) => {
        // Adjust this to match how you determine if a cell is special
        const cell = document.getElementById(cellId);
        return cell && cell.dataset.special === 'true';
    };

    const handleClick = (event) => {
        const cellId = event.target.id;
        const cellNumber = parseInt(cellId.replace('cell-', ''), 10);
        setSelectedCell(cellNumber);

        const rowNumber = Math.floor((cellNumber - 1) / 10);
        const columnNumber = (cellNumber - 1) % 10;

        highlightCells(cellNumber, rowNumber, columnNumber);
    };

    const highlightCells = (cellNumber, rowNumber, columnNumber) => {
        // Clear existing highlights
        document.querySelectorAll('.grid-item').forEach(cell => cell.style.backgroundColor = '');

        if (selectedDirection === 'horizontal') {
            for (let i = 0; i < 10; i++) { // 10 columns
                const currentCellId = `cell-${rowNumber * 10 + i + 1}`;
                const cellElement = document.getElementById(currentCellId);
                if (!cellElement || isSpecialCell(currentCellId)) break;
                cellElement.style.backgroundColor = 'lightblue';
            }
            setSelectedDirection('vertical');
        } else {
            for (let i = 0; i < 11; i++) { // 11 rows
                const currentCellId = `cell-${i * 10 + columnNumber + 1}`;
                const cellElement = document.getElementById(currentCellId);
                if (!cellElement || isSpecialCell(currentCellId)) break;
                cellElement.style.backgroundColor = 'lightblue';
            }
            setSelectedDirection('horizontal');
        }
    };
    
    return (
        <div className="canvas">
            
          
            <div className="grid-container">
            <div className="grid-item" onClick={handleClick} id="cell-1"></div>
            <div className="grid-item" onClick={handleClick} id="cell-2"></div>
            <div className="grid-item" onClick={handleClick} id="cell-3"></div>
            <div className="grid-item" onClick={handleClick} id="cell-4"></div>
            <div className="grid-item" onClick={handleClick} id="cell-5"></div>
            <div className="grid-item" onClick={handleClick} id="cell-6"></div>
            <div className="grid-item" onClick={handleClick} id="cell-7"></div>
            <div className="grid-item" onClick={handleClick} id="cell-8"></div>
            <div className="grid-item" onClick={handleClick} id="cell-9"></div>
            <div className="grid-item" onClick={handleClick} id="cell-10"></div>
            <div className="grid-item" onClick={handleClick} id="cell-11"></div>
            <div className="grid-item" onClick={handleClick} id="cell-12"></div>
            <div className="grid-item" onClick={handleClick} id="cell-13"></div>
            <div className="grid-item" onClick={handleClick} id="cell-14"></div>
            <div className="grid-item special-1" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-16"></div>
            <div className="grid-item" onClick={handleClick} id="cell-17"></div>
            <div className="grid-item" onClick={handleClick} id="cell-18"></div>
            <div className="grid-item" onClick={handleClick} id="cell-19"></div>
            <div className="grid-item" onClick={handleClick} id="cell-20"></div>
            <div className="grid-item" onClick={handleClick} id="cell-21"></div>
            <div className="grid-item" onClick={handleClick} id="cell-22"></div>
            <div className="grid-item" onClick={handleClick} id="cell-23"><span className="static-number">1</span></div>
            <div className="grid-item" onClick={handleClick} id="cell-24"></div>
            <div className="grid-item special-2" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-26"></div>
            <div className="grid-item" onClick={handleClick} id="cell-27"></div>
            <div className="grid-item" onClick={handleClick} id="cell-28"></div>
            <div className="grid-item" onClick={handleClick} id="cell-29"><span className="static-number">2</span></div>
            <div className="grid-item" onClick={handleClick} id="cell-30"></div>
            <div className="grid-item" onClick={handleClick} id="cell-31"></div>
            <div className="grid-item" onClick={handleClick} id="cell-32"></div>
            <div className="grid-item" onClick={handleClick} id="cell-33"></div>
            <div className="grid-item" onClick={handleClick} id="cell-34"></div>
            <div className="grid-item" onClick={handleClick} id="cell-35"></div>
            <div className="grid-item" onClick={handleClick} id="cell-36"></div>
            <div className="grid-item" onClick={handleClick} id="cell-37"></div>
            <div className="grid-item" onClick={handleClick} id="cell-38"></div>
            <div className="grid-item" onClick={handleClick} id="cell-39"></div>
            <div className="grid-item" onClick={handleClick} id="cell-40"></div>
            <div className="grid-item" onClick={handleClick} id="cell-41"></div>
            <div className="grid-item" onClick={handleClick} id="cell-42"><span className="static-number">3</span></div>
            <div className="grid-item" onClick={handleClick} id="cell-43"></div>
            <div className="grid-item" onClick={handleClick} id="cell-44"></div>
            <div className="grid-item special-3" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-46"></div>
            <div className="grid-item" onClick={handleClick} id="cell-47"></div>
            <div className="grid-item" onClick={handleClick} id="cell-48"></div>
            <div className="grid-item" onClick={handleClick} id="cell-49"></div>
            <div className="grid-item" onClick={handleClick} id="cell-50"></div>
            <div className="grid-item" onClick={handleClick} id="cell-51"></div>
            <div className="grid-item" onClick={handleClick} id="cell-52"></div>
            <div className="grid-item" onClick={handleClick} id="cell-53"></div>
            <div className="grid-item" onClick={handleClick} id="cell-54"></div>
            <div className="grid-item" onClick={handleClick} id="cell-55"></div>
            <div className="grid-item" onClick={handleClick} id="cell-56"></div>
            <div className="grid-item special-4" data-special="true"></div>
            <div className="grid-item special-5" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-59"></div>
            <div className="grid-item special-6" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-61"></div>
            <div className="grid-item special-7" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-63"></div>
            <div className="grid-item special-8" data-special="true"></div>
            <div className="grid-item special-9" data-special="true"></div>
            <div className="grid-item special-10" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-67"></div>
            <div className="grid-item" onClick={handleClick} id="cell-68"></div>
            <div className="grid-item" onClick={handleClick} id="cell-69"></div>
            <div className="grid-item" onClick={handleClick} id="cell-70"><span className="static-number">4</span></div>
            <div className="grid-item" onClick={handleClick} id="cell-71"></div>
            <div className="grid-item" onClick={handleClick} id="cell-72"></div>
            <div className="grid-item" onClick={handleClick} id="cell-73"></div>
            <div className="grid-item" onClick={handleClick} id="cell-74"></div>
            <div className="grid-item special-11" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-76"></div>
            <div className="grid-item" onClick={handleClick} id="cell-77"></div>
            <div className="grid-item" onClick={handleClick} id="cell-78"></div>
            <div className="grid-item" onClick={handleClick} id="cell-79"></div>
            <div className="grid-item" onClick={handleClick} id="cell-80"></div>
            <div className="grid-item" onClick={handleClick} id="cell-81"></div>
            <div className="grid-item" onClick={handleClick} id="cell-82"></div>
            <div className="grid-item" onClick={handleClick} id="cell-83"></div>
            <div className="grid-item" onClick={handleClick} id="cell-84"></div>
            <div className="grid-item special-12" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-86"></div>
            <div className="grid-item" onClick={handleClick} id="cell-87"></div>
            <div className="grid-item" onClick={handleClick} id="cell-88"></div>
            <div className="grid-item" onClick={handleClick} id="cell-89"></div>
            <div className="grid-item" onClick={handleClick} id="cell-90"></div>
            <div className="grid-item" onClick={handleClick} id="cell-91"></div>
            <div className="grid-item" onClick={handleClick} id="cell-92"></div>
            <div className="grid-item" onClick={handleClick} id="cell-93"><span className="static-number">5</span></div>
            <div className="grid-item" onClick={handleClick} id="cell-94"></div>
            <div className="grid-item" onClick={handleClick} id="cell-95"></div>
            <div className="grid-item" onClick={handleClick} id="cell-96"></div>
            <div className="grid-item" onClick={handleClick} id="cell-97"></div>
            <div className="grid-item" onClick={handleClick} id="cell-98"></div>
            <div className="grid-item" onClick={handleClick} id="cell-99"></div>
            <div className="grid-item" onClick={handleClick} id="cell-100"></div>
            <div className="grid-item" onClick={handleClick} id="cell-101"></div>
            <div className="grid-item" onClick={handleClick} id="cell-102"></div>
            <div className="grid-item" onClick={handleClick} id="cell-103"></div>
            <div className="grid-item" onClick={handleClick} id="cell-104"></div>
            <div className="grid-item special-13" data-special="true"></div>
            <div className="grid-item" onClick={handleClick} id="cell-106"></div>
            <div className="grid-item" onClick={handleClick} id="cell-107"><span className="static-number">6</span></div>
            <div className="grid-item" onClick={handleClick} id="cell-108"></div>
            <div className="grid-item" onClick={handleClick} id="cell-109"></div>
            <div className="grid-item" onClick={handleClick} id="cell-110"></div>
            </div>
        </div>
    );
};

export default CrosswordGrid;