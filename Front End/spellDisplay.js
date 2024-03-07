// Fetch spells from the server
function fetchSpells() {
    const container = document.getElementById('spellsContainer');
    container.innerHTML = ''; 

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

        displayAlterSlots();
}

function displaySpell(spell) {
    const container = document.getElementById('spellsContainer');

    const spellDiv = document.createElement('div');
    spellDiv.className = 'spell';

    const spellTitle = document.createElement('h3');
    spellTitle.innerText = spell.Name;
    spellTitle.className = `spell-title spell-level-${spell.Level}`;
    spellTitle.addEventListener('click', () => {
        spellDetails.classList.toggle('collapsed');
    });

    const castButton = document.createElement('button');
    castButton.innerText = 'Cast';
    castButton.className = 'cast-button';
    castButton.addEventListener('click', () => {
        const spellLevel = parseInt(spell.Level, 10); // Ensure spell.Level is treated as an integer
        if (canCastSpell(spellLevel)) {
            useSpellSlot(spellLevel); // Use a spell slot of the given level
            updateCastButtonState(castButton, spellLevel); // Update the button's disabled state
        } else {
            alert('No more slots available for this level.');
        }
    });

    const spellDetails = document.createElement('div');
    spellDetails.className = 'spell-details collapsed';

    // Damage Type
    let damageTypeDescription = `Damage Type: ${spell.CurrentDamage || spell.OriginalDamage || 'N/A'}`;
    
    // Save Type
    let saveTypeDescription = `Save Type: ${spell.CurrentSave || spell.OriginalSave || 'N/A'}`;

    // Additional properties to display
    const properties = [
        'Description', 'HigherLevel', 'Level', 'CastingTime', 
        'Range', 'Components', 'Duration', damageTypeDescription, saveTypeDescription
    ];

    properties.forEach(prop => {
        const para = document.createElement('p');
        if (prop.includes('Damage Type') || prop.includes('Save Type')) {
            para.innerHTML = `<strong>${prop.split(':')[0]}:</strong> ${prop.split(': ')[1]}`;
        } else {
            para.innerHTML = `<strong>${prop}:</strong> ${spell[prop] || 'N/A'}`;
        }
        spellDetails.appendChild(para);
    });

    spellTitle.appendChild(castButton);
    spellDiv.appendChild(spellTitle);
    spellDiv.appendChild(spellDetails);
    container.appendChild(spellDiv);

    appendAlterButtons(spell, spellDetails); // This function should already exist in your code and remains unchanged
}




function appendAlterButtons(spell, spellDetails) {
    // Alter Damage Button
    const alterDamageBtn = document.createElement('button');
    alterDamageBtn.innerText = 'Alter Damage';
    alterDamageBtn.className = 'alter-btn alter-damage';
    alterDamageBtn.dataset.spellid = spell.SpellID;
    alterDamageBtn.dataset.attribute = 'damage';
    alterDamageBtn.addEventListener('click', () => createDropdownForAttribute('damage', spell, spellDetails));

    // Alter Save Button
    const alterSaveBtn = document.createElement('button');
    alterSaveBtn.innerText = 'Alter Save';
    alterSaveBtn.className = 'alter-btn alter-save';
    alterSaveBtn.dataset.spellid = spell.SpellID;
    alterSaveBtn.dataset.attribute = 'save';
    alterSaveBtn.addEventListener('click', () => createDropdownForAttribute('save', spell, spellDetails));

    spellDetails.appendChild(alterDamageBtn);
    spellDetails.appendChild(alterSaveBtn);
}

function createDropdownForAttribute(attribute, spell, container) {
    const optionsList = attribute === 'damage' ?
        ['', 'acid', 'cold', 'fire', 'force', 'lightning', 'necrotic', 'radiant', 'thunder'] :
        ['', 'INT', 'WIS', 'CHA', 'CON', 'STR', 'DEX'];

    const dropdown = document.createElement('select');
    dropdown.setAttribute('data-spellid', spell.SpellID); // Ensure each dropdown is uniquely associated with its spell

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `Select ${attribute}`;
    dropdown.appendChild(defaultOption);

    optionsList.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        if (dropdown.value !== '') {
            updateSpellAttribute(spell.SpellID, attribute, dropdown.value);
            useAlterSlot();
        }
    });

    // Correctly find and remove the button to replace it with the dropdown
    const btnToRemove = attribute === 'damage' ? container.querySelector('.alter-damage') : container.querySelector('.alter-save');
    if (btnToRemove) {
        container.replaceChild(dropdown, btnToRemove);
    } else {
        console.error('Button to remove not found');
    }
    dropdown.focus();
}


function updateSpellAttribute(spellId, attribute, newValue) {
    const payload = { spellId };
    const attrKey = attribute === 'damage' ? 'currentDamage' : 'currentSave'; 
    payload[attrKey] = newValue;

    const endpoint = `http://localhost:3000/spells/update${attrKey}`;
    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Providing user feedback
        fetchSpells(); // Refresh spells to reflect changes
    })
    .catch(error => console.error('Error updating spell:', error));
}





