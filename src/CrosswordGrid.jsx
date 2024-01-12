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
    const [letterUpdated, setLetterUpdated] = useState(false);

    useEffect(() => {
        
        // Load saved content or initialize an empty object
        const savedContent = window.localStorage.getItem('gridContent');
        gridContentRef.current = savedContent ? JSON.parse(savedContent) : {};

        setGridVectors(createGridVectors());
    }, []);
    useEffect(() => {
        if (letterUpdated) {
            let step = /^[a-zA-ZÖÄÅöäå]$/.test(letterUpdated.key) ? 1 : -1;
            moveGridItemFocus(step);
            setLetterUpdated(false); // Reset the flag after moving focus
        }
    }, [letterUpdated]);

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
    const moveGridItemFocus = (step) => {
        if (!selectedItemId) return;

        let index = selectedItemId - 1; // Adjusting because itemId starts from 1
        let nextIndex = index + step * (selectionMode === 'horizontal' ? 1 : 10);
        let row = Math.floor(nextIndex / 10);
        let col = nextIndex % 10;

        // Check bounds for horizontal and vertical movement
        if ((selectionMode === 'horizontal' && (col < 0 || col >= 10)) ||
            (selectionMode === 'vertical' && (row < 0 || row >= 11))) {
            return;
        }

        // Adjusting nextIndex to match itemId
        nextIndex = nextIndex + 1;
        if (nextIndex < 1 || nextIndex > 110) return; // Boundary check for the grid

        let nextItem = gridVectors[nextIndex - 1];
        if (!nextItem || nextItem.isSpecial) {
            return; // If there is no next item or it's a special item, do nothing
        }

        setSelectedItemId(nextIndex); // Update the selected item state
    };

    const handleKeyPress = (itemId, event) => {
        /*...*/
        if (/^[a-zA-ZÖÄÅöäå]$/.test(event.key) || event.key === 'Delete' || event.key === 'Backspace') {
            // Move the focus to the next grid item before updating the content
            let step = /^[a-zA-ZÖÄÅöäå]$/.test(event.key) ? 1 : -1;
            moveGridItemFocus(step);
            // Then update the content for the current item
            const updatedContent = {
                ...gridContentRef.current,
                [selectedItemId]: /^[a-zA-ZÖÄÅöäå]$/.test(event.key) ? event.key.toUpperCase() : '',
            };
            gridContentRef.current = updatedContent;
            window.localStorage.setItem('gridContent', JSON.stringify(updatedContent));
            // Trigger a re-render to update the UI
            setGridVectors(createGridVectors());
        }
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