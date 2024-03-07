function displaySpellSlots(slotsPerLevel) {
    const slotsContainer = document.querySelector('.spell-slots'); // Select the main container for spell slots

    slotsContainer.innerHTML = '';

    slotsPerLevel.forEach((slots, index) => {
        const level = index + 1; // Spell level (1-based index)
        const levelSlotsContainer = document.createElement('div');
        levelSlotsContainer.className = 'level-slots';
        levelSlotsContainer.id = `level-${level}-slots`; // Assign an ID for specific level
        
        const levelTitle = document.createElement('h4');
        levelTitle.textContent = `Level ${level} Slots:`;
        levelSlotsContainer.appendChild(levelTitle);

        for (let i = 0; i < slots; i++) {
            const slot = document.createElement('span');
            slot.className = 'spell-slot';
            levelSlotsContainer.appendChild(slot);
        }

        slotsContainer.appendChild(levelSlotsContainer);
    });
}


function useSpellSlot(level) {
    const levelSlots = document.querySelectorAll(`#level-${level}-slots .spell-slot:not(.used)`);
    if (levelSlots.length > 0) {
        levelSlots[0].classList.add('used');
        slotsPerLevel[level - 1]--;
        localStorage.setItem('slotsPerLevel', JSON.stringify(slotsPerLevel)); // Save updated slots to localStorage
    }
}

function canCastSpell(level) {
    if (level === 0) {
        // Level 0 spells (cantrips) don't use slots, can always cast
        return true;
    }
    return slotsPerLevel[level - 1] > 0;
}

function updateCastButtonState(button, level) {
    button.disabled = !canCastSpell(level);
}

// Inside displaySpell function, after creating the cast button:
updateCastButtonState(castButton, spell.Level);

function displayAlterSlots() {
    const slotsContainer = document.querySelector('.alter-slots');
    slotsContainer.innerHTML = ''; // Clear existing slots

    const title = document.createElement('h4');
    title.textContent = 'Alter Slots:';
    slotsContainer.appendChild(title);

    const totalAlterSlots = 5; // Total number of alter slots
    // Calculate the number of used slots based on the current alterSlots value
    const usedSlotsCount = totalAlterSlots - alterSlots;

    for (let i = 0; i < totalAlterSlots; i++) {
        const slot = document.createElement('span');
        slot.className = 'alter-slot';
        // If the current index is less than the number of used slots, mark it as used
        if (i < usedSlotsCount) {
            slot.classList.add('used');
        }
        slotsContainer.appendChild(slot);
    }
}





function useAlterSlot() {
    if (alterSlots > 0) {
        alterSlots--;

        const unusedAlterSlot = document.querySelector('.alter-slot:not(.used)');
        if (unusedAlterSlot) {
            unusedAlterSlot.classList.add('used');
        }

        localStorage.setItem('alterSlots', alterSlots.toString());
    } else {
        alert("No more alter slots available.");
    }
}


function resetSpellAndAlterSlots() {

    slotsPerLevel = [4, 2]; 
    alterSlots = 5; 


    localStorage.setItem('slotsPerLevel', JSON.stringify(slotsPerLevel));
    localStorage.setItem('alterSlots', alterSlots.toString());

    displaySpellSlots(slotsPerLevel);
    displayAlterSlots();
}

