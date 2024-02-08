CREATE DATABASE robyns_spellbook;

USE robyns_spellbook;

CREATE TABLE Spells (
    SpellID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    HigherLevel TEXT,
    Level INT,
    CastingTime VARCHAR(255),
    `Range` VARCHAR(255), -- Range needed '' because it is a keyword
    Components VARCHAR(255),
    Duration VARCHAR(255)
);

CREATE TABLE AlteredSpells (
    AlteredSpellID INT AUTO_INCREMENT PRIMARY KEY,
    SpellID INT,
    AlteredName VARCHAR(255),
    AlteredDescription TEXT,
    FOREIGN KEY (SpellID) REFERENCES Spells(SpellID)
);

-- Below are insert statements for hardcoding spells not found in the API

INSERT INTO Spells (Name, Description, HigherLevel, Level, CastingTime, `Range`, Components, Duration) 
VALUES ('Ice Knife',
        'You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 2d6 cold damage.',
        'When you cast this spell using a spell slot of 2nd level or higher, the cold damage increases by 1d6 for each slot level above 1st.',
        '1',
        '1 Action',
        '60 ft (5 ft Sphere)',
        'S, M (a drop of water or piece of ice)',
        'Instantaneous');

INSERT INTO Spells (Name, Description, HigherLevel, Level, CastingTime, `Range`, Components, Duration) 
VALUES ("Tasha's Hideous Laughter",
        'A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration. A creature with an Intelligence score of 4 or less is not affected. At the end of each of its turns, and each time it takes damage, the target can make another Wisdom saving throw. The target has advantage on the saving throw if it is triggered by damage. On a success, the spell ends.',
        null,
        '1',
        '1 action',
        '30 feet',
        'V, S, M (tiny tarts and a feather that is waved in the air)',
        'Concentration, up to 1 minute');

