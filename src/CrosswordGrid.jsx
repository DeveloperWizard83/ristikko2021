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
    const [zoomLevel, setZoomLevel] = useState(1); // State to keep track of zoom level
    const touchStartRef = useRef({})
    const invisibleInputRef = useRef(null);;
    const prevValueRef = useRef(' ');

    useEffect(() => {
        // Load saved content or initialize an empty object
        const savedContent = window.localStorage.getItem('gridContent');
        gridContentRef.current = savedContent ? JSON.parse(savedContent) : {};

        setGridVectors(createGridVectors());
        // Attempt to focus the invisible input safely
        if (invisibleInputRef.current) {
            invisibleInputRef.current.focus();
        }
    }, []);
    useEffect(() => {
        if (letterUpdated) {
            let step = /^[a-zA-ZÖÄÅöäå]$/.test(letterUpdated.key) ? 1 : -1;
            moveGridItemFocus(step);
            setLetterUpdated(false); // Reset the flag after moving focus
        }
    }, [letterUpdated]);

    const handleInvisibleInputChange = (e) => {
        const currentValue = e.target.value;
        // Detecting deletion: if the current value is just a space (or empty, depending on your reset logic),
        // and the previous value was also a space (indicating the last action was not character input)
        if (currentValue.trim() === '' && prevValueRef.current === ' ') {
            deleteGridLetter();
            moveGridItemFocus(-1);
        } else {
            const lastChar = currentValue.trim().slice(-1);
            if (/^[a-zA-ZÖÄÅöäå]$/.test(lastChar)) {
                updateGridWithLetter(lastChar.toUpperCase());
                moveGridItemFocus(1);
            }
        }

        // Reset the invisible input's value to a single space to allow continuous input
        e.target.value = ' ';
        prevValueRef.current = ' '; // Update the previous value
    };
    const updateGridWithLetter = (letter) => {
        if (!selectedItemId) return;
        const updatedContent = { ...gridContentRef.current, [selectedItemId]: letter };
        gridContentRef.current = updatedContent;
        setGridVectors(createGridVectors());
        window.localStorage.setItem('gridContent', JSON.stringify(updatedContent));
    };

    const deleteGridLetter = () => {
        if (!selectedItemId) return;
        const updatedContent = { ...gridContentRef.current, [selectedItemId]: '' };
        gridContentRef.current = updatedContent;
        setGridVectors(createGridVectors());
        window.localStorage.setItem('gridContent', JSON.stringify(updatedContent));
    };

    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.sqrt((touch1.pageX - touch2.pageX) ** 2 + (touch1.pageY - touch2.pageY) ** 2);
            touchStartRef.current = { touch1, touch2, distance };
        }
    };
    const handleTouchMove = (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const newDistance = Math.sqrt((touch1.pageX - touch2.pageX) ** 2 + (touch1.pageY - touch2.pageY) ** 2);
            const scale = newDistance / touchStartRef.current.distance;

            setZoomLevel(zoom => Math.max(1, zoom * scale)); // Update zoom level

            touchStartRef.current = { touch1, touch2, distance: newDistance };
            e.preventDefault(); // Prevent default touch action (scroll/zoom)
        }
    };


    const handleClick = (itemId) => {
        event.preventDefault();
        event.stopPropagation();
        // Toggle selection mode if the same item is clicked consecutively
        if (invisibleInputRef.current) {
            invisibleInputRef.current.focus({ preventScroll: true });
        }
        if (lastClickedItem === itemId) {
            setSelectionMode(prevMode => prevMode === 'horizontal' ? 'vertical' : 'horizontal');
        } else {
            setSelectionMode('horizontal'); // Default to horizontal on first click
        }
        setSelectedItemId(itemId);
        setLastClickedItem(itemId);
        const gridItemNode = document.getElementById(`cell-${itemId}`);
    if (gridItemNode) {
        gridItemNode.focus();
    }
    if (invisibleInputRef.current) {
        invisibleInputRef.current.focus();
    }
    };
    

    const moveGridItemFocus = (step) => {
        if (!selectedItemId) return;
    
        let index = selectedItemId - 1; // Adjusting because itemId starts from 1
        let nextIndex = index + step * (selectionMode === 'horizontal' ? 1 : 10);
        let row = Math.floor(nextIndex / 10);
        let col = nextIndex % 10;
    
        // Check if the next item is in the same row/column
        if ((selectionMode === 'horizontal' && Math.floor(index / 10) !== row) ||
            (selectionMode === 'vertical' && index % 10 !== col)) {
            return;
        }
    
        // Check bounds for horizontal and vertical movement
        if ((selectionMode === 'horizontal' && (col < 0 || col > 9)) ||
            (selectionMode === 'vertical' && (row < 0 || row > 11))) {
            return;
        }
    
        let nextItem = gridVectors[nextIndex];
        if (!nextItem || nextItem.isSpecial) {
            return; // If there is no next item or it's a special item, do nothing
        }
    
        setSelectedItemId(nextIndex + 1); // Update the selected item state
    };
 

    const handleKeyPress = (event) => {

        
        if (invisibleInputRef.current) {
            invisibleInputRef.current.focus({ preventScroll: true });
        }
        if (!selectedItemId) return;
    
        let updatedContent = { ...gridContentRef.current };
    
        if (event.key === 'Delete' || event.key === 'Backspace') {
            updatedContent[selectedItemId] = '';
            gridContentRef.current = updatedContent;
            setGridVectors(createGridVectors());
    
            // Determine the next focus position based on the current selection mode
            let newSelectedItemId = selectedItemId;
            if (selectionMode === 'horizontal') {
                newSelectedItemId = selectedItemId > 1 ? selectedItemId - 1 : 1;
            } else if (selectionMode === 'vertical') {
                // Move up one row if possible
                newSelectedItemId = selectedItemId > 10 ? selectedItemId - 10 : selectedItemId;
            }
    
            setSelectedItemId(newSelectedItemId);
        } else if (/^[a-zA-ZÖÄÅöäå]$/.test(event.key)) {
            updatedContent[selectedItemId] = event.key.toUpperCase();
            gridContentRef.current = updatedContent;
            
            setGridVectors(createGridVectors());
            moveGridItemFocus(1);
        }
    
        window.localStorage.setItem('gridContent', JSON.stringify(updatedContent));
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
        <div className="canvas background" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
           <input
  ref={invisibleInputRef}
  className="invisible-input"
  onChange={handleInvisibleInputChange}
  value=" " // Initialize with a space to ensure deletion can be detected
  autoFocus
/>
            <div className="grid-container" style={{ transform: `scale(${zoomLevel})` }}>
                {gridVectors.map((item) => {
                    const specialClass = item.isSpecial ? specialClassMapping[item.itemId] : '';
                    const staticNumber = staticNumberMapping[item.itemId];
                    const isSelectedItem = item.itemId === selectedItemId;
                    const isVectorItem = isPartOfSelectedVector(item, selectedItemId, gridVectors, selectionMode);
                    const letter = gridContentRef.current[item.itemId] || ''; // Get the letter from gridContentRef
    
                    return (
                        <div
                            key={item.itemId} // Correctly set the unique key here
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