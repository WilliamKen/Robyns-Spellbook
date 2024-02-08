// Fetch spells from the server
function fetchSpells() {
    fetch('http://localhost:3000/spells')
        .then(response => response.json())
        .then(spells => {
            // Sort spells by level
            spells.sort((a, b) => a.Level - b.Level);

            // Display each spell
            spells.forEach(spell => {
                displaySpell(spell);
            });
        })
        .catch(error => console.error('Error fetching spells:', error));
}

function displaySpell(spell) {
    const container = document.getElementById('spellsContainer');

    const spellDiv = document.createElement('div');
    spellDiv.className = 'spell';

    // Spell Title (clickable)
    const spellTitle = document.createElement('h3');
    spellTitle.innerText = spell.Name;
    spellTitle.className = `spell-title spell-level-${spell.Level}`;
    spellTitle.addEventListener('click', function() {
        spellDetails.classList.toggle('collapsed');
    });

    // Spell Cast Button
    const castButton = document.createElement('button');
    castButton.innerText = 'Cast';
    castButton.className = 'cast-button';
    castButton.addEventListener('click', () => {
        if (canCastSpell(spell.Level)) {
            useSpellSlot(spell.Level);
            updateCastButtonState(castButton, spell.Level);
        } else {
            alert('No more spell slots available for this level.');
        }
    });

    spellTitle.appendChild(castButton); // Append Cast Button next to the title

    // Spell Details
    const spellDetails = document.createElement('div');
    spellDetails.className = 'spell-details collapsed';

    // Adding details
    const properties = ['Description', 'HigherLevel', 'Level', 'CastingTime', 'Range', 'Components', 'Duration'];
    properties.forEach(prop => {
        if(spell[prop]) { // Check if the property exists
            const para = document.createElement('p');
            para.innerHTML = `<strong>${prop}:</strong> ${spell[prop]}`;
            spellDetails.appendChild(para);
        }
    });

    spellDiv.appendChild(spellTitle);
    spellDiv.appendChild(spellDetails);
    container.appendChild(spellDiv);
}

