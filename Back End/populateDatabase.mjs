
import 'dotenv/config';

import fetch from 'node-fetch';
import mysql from 'mysql';


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL');
    fetchAndPopulateSpells('https://www.dnd5eapi.co/api/spells', robynsKnownSpells, db);
});

// Newly learned spells need to be added here
const robynsKnownSpells = ['Mage Hand', 'Mending', 'Ray of Frost', 'Alarm', 'Burning Hands', 'Detect Magic', 'Feather Fall', 'Find Familiar', 
                            'Ice Knife', 'Magic Missile', "Tasha's Hideous Laughter", "Scorching Ray"];

function fetchAndPopulateSpells(apiUrl, knownSpells, connection) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filteredSpells = data.results.filter(spell => knownSpells.includes(spell.name));
            filteredSpells.forEach(spell => {
                // This checks to see if the spell is already in the database
                const spellName = spell.name;
                const sql = "SELECT COUNT(*) AS count FROM Spells WHERE Name = ?";
                connection.query(sql, [spellName], (error, results) => {
                    if (error) {
                        console.error('Error checking if spell exists:', error);
                    } else {
                        const count = results[0].count;
                        if (count === 0) {
                            // Spell doesn't already exists and will be inserted.
                            fetchSpellDetails(spell.url, connection);
                        } else {
                            // Spell already exists in the database, skip insertion
                            console.log(`Spell '${spellName}' already exists in the database. Skipping insertion.`);
                        }
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching spells:', error));
}

function fetchSpellDetails(spellUrl, connection) {
    fetch(`https://www.dnd5eapi.co${spellUrl}`)
        .then(response => response.json())
        .then(spellDetails => {
            insertSpellIntoDatabase(spellDetails, connection);
        })
        .catch(error => console.error('Error fetching spell details:', error));
}

function insertSpellIntoDatabase(spell, connection) {
    const sql = `INSERT INTO Spells (Name, Description, HigherLevel, Level, CastingTime, \`Range\`, Components, Duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        spell.name,
        spell.desc.join(' '),
        spell.higher_level ? spell.higher_level.join(' ') : null,
        spell.level,
        spell.casting_time,
        spell.range,
        spell.components.join(', '),
        spell.duration
    ];

    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error("Error inserting spell:", error);
            return;
        }
        console.log(`Inserted spell: ${spell.name}`);
    });
}
