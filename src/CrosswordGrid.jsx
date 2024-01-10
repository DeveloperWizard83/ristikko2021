import React, { useState,useEffect } from 'react';
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

    useEffect(() => {
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
    // Function to check if an item is part of the selected vector
    const isPartOfSelectedVector = (item, selectedItemId, gridVectors, selectionMode) => {
        if (!selectedItemId || item.itemId === selectedItemId) return false;
        
        // Determine the row and column of the clicked and current items
        const selectedRow = Math.ceil(selectedItemId / 10);
        const selectedCol = selectedItemId % 10 || 10;
        const itemRow = Math.ceil(item.itemId / 10);
        const itemCol = item.itemId % 10 || 10;
    
        // Horizontal vector selection
        if (selectedRow === itemRow) {
            // Find the direction (left or right of the special item)
            const direction = (itemCol > selectedCol) ? 1 : -1;
    
            for (let i = selectedItemId; i !== item.itemId; i += direction) {
                if (gridVectors[i - 1].isSpecial) return false;
            }
    
            return true;
        }
        
    
        // Vertical vector selection
        if (selectedCol === itemCol) {
            // Find the direction (above or below the special item)
            const direction = (itemRow > selectedRow) ? 10 : -10;
    
            for (let i = selectedItemId; i !== item.itemId; i += direction) {
                if (i <= 0 || i > 110) return false; // Boundary check
                if (gridVectors[i - 1].isSpecial) return false;
            }

    
            return true;
        }
        
    
        return false;
        
    }

    return (
        <div className="canvas">
            <div className="grid-container">
                {gridVectors.map((item) => {
                    const specialClass = item.isSpecial ? specialClassMapping[item.itemId] : '';
                    const staticNumber = staticNumberMapping[item.itemId];
                    const isSelectedItem = item.itemId === selectedItemId;
                    const isVectorItem = isPartOfSelectedVector(item, selectedItemId, gridVectors, selectionMode);

                    return (
                        <div
                            key={item.itemId}
                            className={`grid-item ${specialClass} ${isSelectedItem ? 'selected-item' : ''} ${isVectorItem ? 'selected-vector' : ''}`}
                            onClick={() => handleClick(item.itemId)}
                            id={`cell-${item.itemId}`}
                        >
                            {staticNumber && <span className="static-number">{staticNumber}</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CrosswordGrid;