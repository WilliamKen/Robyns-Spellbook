// Function for applying damage and healing. Includes Temp HP
document.addEventListener('DOMContentLoaded', () => {
    const applyDamageButton = document.getElementById('apply-damage');

    applyDamageButton.addEventListener('click', () => {
        const hpInput = document.getElementById('hp');
        const tempHpInput = document.getElementById('tempHp');
        const damageInput = document.getElementById('damage');

        let currentHp = parseInt(hpInput.value);
        let currentTempHp = parseInt(tempHpInput.value);
        const changeInHp = parseInt(damageInput.value);

        if (changeInHp < 0) {
            // Healing
            currentHp = Math.min(currentHp - changeInHp, 20); // Change max HP here upon leveling up
        } else {
            // Taking Damage
            currentTempHp -= changeInHp;

            // If Temp HP is completely depleted, subtract the remainder from regular HP
            if (currentTempHp < 0) {
                currentHp += currentTempHp; // currentTempHp is negative here
                currentTempHp = 0;
            }
        }

        // Update the HP and Temp HP values
        hpInput.value = currentHp > 0 ? currentHp : 0; // Prevent HP from going below 0
        tempHpInput.value = currentTempHp;

        // Clear the damage input field
        damageInput.value = '';
    });
});

// Hardcoded Spells
const hardcodedSpells = {
    "Ice Knife": {
        name: "Ice Knife",
        desc: [
            "You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 2d6 cold damage."
        ],
        higher_level: [
            "When you cast this spell using a spell slot of 2nd level or higher, the cold damage increases by 1d6 for each slot level above 1st."
        ],
        level: 1,
        casting_time: "1 Action",
        range: "60 ft (5 ft *)",
        components: "S, M *",
        duration: "Instantaneous",
        school: "Conjuration",
        attack_type: "DEX Save"
    },
    "Tasha's Hideous Laughter": {
        name: "Tasha's Hideous Laughter",
        desc: [
            "A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration. A creature with an Intelligence score of 4 or less isn’t affected.",
            "At the end of each of its turns, and each time it takes damage, the target can make another Wisdom saving throw. The target has advantage on the saving throw if it’s triggered by damage. On a success, the spell ends."
        ],
        level: 1,
        casting_time: "1 action",
        range: "30 feet",
        components: "V, S, M (tiny tarts and a feather that is waved in the air)",
        duration: "Concentration, up to 1 minute",
        school: "Enchantment"
    }
};

// Below are the functions for fetching the API data, filtering the spells to Robyn's known spells, and displaying them

// Function for hardcoded spell dropdowns
function attachClickEventToSpellTitles() {
    const spellTitles = document.querySelectorAll('.spell-title');
    spellTitles.forEach(title => {
        title.addEventListener('click', () => {
            const spellDetails = title.nextElementSibling; // Get the next sibling element, which is the spell details
            if (spellDetails) {
                spellDetails.classList.toggle('collapsed');
            }
        });
    });
}

// Function to display details of a spell
function displaySpellDetails(spell, container) {
    const spellElement = document.createElement('div');
    spellElement.classList.add('spell');

    const spellTitle = document.createElement('h3');
    spellTitle.innerText = spell.name;
    spellTitle.classList.add('spell-title');

    const spellDetails = document.createElement('div');
    spellDetails.classList.add('spell-details', 'collapsed');

    // Construct the spell details for HTML
    spellDetails.innerHTML = `
        <p><strong>Description:</strong> ${spell.desc.join(' ')}</p>
        <p><strong>Higher Level:</strong> ${spell.higher_level ? spell.higher_level.join(' ') : ''}</p>
        <p><strong>Range:</strong> ${spell.range}</p>
        <p><strong>Components:</strong> ${spell.components}</p>
        <p><strong>Duration:</strong> ${spell.duration}</p>
        <p><strong>Casting Time:</strong> ${spell.casting_time}</p>
        <p><strong>Level:</strong> ${spell.level}</p>
        <p><strong>School:</strong> ${spell.school}</p>
    `;

    spellElement.appendChild(spellTitle);
    spellElement.appendChild(spellDetails);

    spellTitle.addEventListener('click', () => {
        spellDetails.classList.toggle('collapsed');
    });

    console.log('Appending to container:', container)
    container.appendChild(spellElement); // Append to the provided container
}


// Function to display the spells by level
function displaySpellsByLevel(spellsByLevel) {
    const spellsContainer = document.getElementById('spells-container');
    spellsContainer.innerHTML = '';  // Clear any existing content

    spellsByLevel.forEach((spells, level) => {
        // Create a header for each spell level
        const levelHeader = document.createElement('h2');
        levelHeader.textContent = level === 0 ? 'Cantrips' : `Level ${level}`;
        spellsContainer.appendChild(levelHeader);

        // Display each spell under its respective level
        spells.forEach(spell => {
            displaySpellDetails(spell, spellsContainer);
        });
    });
}


// Fetches spells from API
function fetchSpells(apiUrl, knownSpells) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            const filteredSpells = data.results.filter(spell => knownSpells.includes(spell.name));
            processSpellList(filteredSpells);
        })
        .catch(error => console.log('error', error));
}

// Uses the first API fetch to get spell details
function processSpellList(spells) {
    let spellsByLevel = new Map();

    const spellFetchPromises = spells.map(spell => fetch("https://www.dnd5eapi.co" + spell.url)
        .then(response => response.json()));

    Promise.all(spellFetchPromises).then(fetchedSpells => {
        fetchedSpells.forEach(spell => {
            const level = spell.level || 0;  // Cantrips are level 0
            if (!spellsByLevel.has(level)) {
                spellsByLevel.set(level, []);
            }
            spellsByLevel.get(level).push(spell);
        });
        displaySpellsByLevel(spellsByLevel);
    }).catch(error => console.error('Error in processing spell list:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    // Display hardcoded spells
    Object.values(hardcodedSpells).forEach(spell => {
        displaySpellDetails(spell);
    });

    // Robyn's known spells
    const robynsKnownSpells = ['Mage Hand', 'Mending', 'Ray of Frost', 'Alarm', 'Burning Hands', 'Detect Magic', 'Feather Fall', 'Find Familiar', 'Ice Knife', 'Magic Missile', "Tasha's Hideous Laughter"];
    
    fetchSpells('https://www.dnd5eapi.co/api/spells', robynsKnownSpells);
});

// Logs the raw API data to the browser's console, this was useful for visualizing the data I was fetching
/*fetch("https://www.dnd5eapi.co/api/spells")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log("Raw API Data:", data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
*/

