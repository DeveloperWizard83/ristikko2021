import React, { useState,useEffect, useRef } from 'react';
import './CrosswordGrid.css';


const specialClassMapping = {
    15: 'special-1',
    25: 'special-2',
    45: 'special-3',
    57: 'special-4',
    58: 'special-5',
    60: 'special-6',
    62: 'special-7',
    64: 'special-8',
    65: 'special-9',
    66: 'special-10',
    75: 'special-11',
    85: 'special-12',
    105: 'special-13'
};


const staticNumberMapping = {
    23: 1,
    29: 2,
    42: 3,
    70: 4,
    93: 5,
    107: 6
    // ... other static number mappings
};

function createGridVectors() {
    const grid = [];
    const specialItems = [15, 25, 45, 57, 58, 60, 62, 64, 65, 66, 75, 85, 105];
    
    const gridSize = 110; // Assuming a grid of size 110

    for (let i = 1; i <= gridSize; i++) {
        let isSpecial = specialItems.includes(i);
        let horizontalVector = null;
        let verticalVector = null;

        // ... vector calculations

        grid.push({
            itemId: i,
            isSpecial: isSpecial,
            horizontalVector: horizontalVector,
            verticalVector: verticalVector
        });
    }

    return grid;
}

function CrosswordGrid() {
    const [gridVectors, setGridVectors] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [lastClickedItem, setLastClickedItem] = useState(null);
    const [selectionMode, setSelectionMode] = useState('horizontal');
    const gridContentRef = useRef({}); // Initialize gridContentRef

    useEffect(() => {
        // Load saved content or initialize an empty object
        const savedContent = window.localStorage.getItem('gridContent');
        gridContentRef.current = savedContent ? JSON.parse(savedContent) : {};

        setGridVectors(createGridVectors());
    }, []);

    const handleClick = (itemId) => {
        // Toggle selection mode if the same item is clicked consecutively
        if (lastClickedItem === itemId) {
            setSelectionMode(prevMode => prevMode === 'horizontal' ? 'vertical' : 'horizontal');
        } else {
            setSelectionMode('horizontal'); // Default to horizontal on first click
        }
        setSelectedItemId(itemId);
        setLastClickedItem(itemId);
    };

    const handleKeyPress = (itemId, event) => {
        console.log(itemId, event.key);
        // Ensure that the event is only handled for the selected grid item
        if (!selectedItemId || itemId !== selectedItemId) return;
    
        // Check if the key pressed is a valid letter (A-Ö, a-ö)
        if (/^[a-zA-ZÖÄÅöäå]$/.test(event.key)) {
            // Update the content with the pressed key
            const updatedContent = { ...gridContentRef.current, [itemId]: event.key.toUpperCase() };
            gridContentRef.current = updatedContent;
            window.localStorage.setItem('gridContent', JSON.stringify(updatedContent));
            
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            // Handle delete or backspace key by removing the letter
            const updatedContent = { ...gridContentRef.current, [itemId]: '' };
            gridContentRef.current = updatedContent;
            window.localStorage.setItem('gridContent', JSON.stringify(updatedContent));
        }
    
        // Trigger a re-render to update the UI
        setGridVectors(createGridVectors());
    };
    // Function to check if an item is part of the selected vector
    const isPartOfSelectedVector = (item, selectedItemId, gridVectors, selectionMode) => {
        if (!selectedItemId || item.itemId === selectedItemId) return false;
        
        const selectedRow = Math.ceil(selectedItemId / 10);
        const selectedCol = selectedItemId % 10 || 10;
        const itemRow = Math.ceil(item.itemId / 10);
        const itemCol = item.itemId % 10 || 10;
    
        // Check if the current item is in the same row or column as the selected item
        const isInSameRow = selectedRow === itemRow;
        const isInSameColumn = selectedCol === itemCol;
    
        // Horizontal vector selection
        if (selectionMode === 'horizontal' && isInSameRow) {
            const direction = (itemCol > selectedCol) ? 1 : -1;
            for (let i = selectedItemId; i !== item.itemId; i += direction) {
                if (gridVectors[i - 1].isSpecial) return false;
            }
            return true;
        }
        
        // Vertical vector selection
        if (selectionMode === 'vertical' && isInSameColumn) {
            const direction = (itemRow > selectedRow) ? 10 : -10;
            for (let i = selectedItemId; i !== item.itemId; i += direction) {
                if (i <= 0 || i > 110) return false; // Boundary check
                if (gridVectors[i - 1].isSpecial) return false;
            }
            return true;
        }
        
        return false;
    };

    return (
        <div className="canvas">
            <div className="grid-container">
                {gridVectors.map((item) => {
                    const specialClass = item.isSpecial ? specialClassMapping[item.itemId] : '';
                    const staticNumber = staticNumberMapping[item.itemId];
                    const isSelectedItem = item.itemId === selectedItemId;
                    const isVectorItem = isPartOfSelectedVector(item, selectedItemId, gridVectors, selectionMode);
                    const letter = gridContentRef.current[item.itemId] || ''; // Get the letter from gridContentRef

                    return (
                        <div
                            key={item.itemId}
                            onKeyPress={(event) => handleKeyPress(item.itemId, event)}
                            tabIndex={isVectorItem ? 0 : -1}
                            onKeyDown={isVectorItem ? (e) => handleKeyPress(item.itemId, e) : null}
                            className={`grid-item ${specialClass} ${isSelectedItem ? 'selected-item' : ''} ${isVectorItem ? 'selected-vector' : ''}`}
                            onClick={() => handleClick(item.itemId)}
                            id={`cell-${item.itemId}`}
                        >
                            {staticNumber && <span className="static-number">{staticNumber}</span>}
                            <span className="letter">{letter}</span> {/* Display the letter */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CrosswordGrid;