function displaySpellSlots(slotsPerLevel) {
    const slotsContainer = document.querySelector('.spell-slots'); // Select the main container for spell slots

    // Clear previous slots to avoid duplication if this function is called multiple times
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
    const levelSlots = document.querySelectorAll(`.level-slots:nth-child(${level}) .spell-slot:not(.used)`);
    if (levelSlots.length > 0) {
        levelSlots[0].classList.add('used');
        // Update slotsPerLevel to reflect the used slot
        slotsPerLevel[level - 1]--;
    }
}

// Spells slots 
let slotsPerLevel = [3, 2];

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
