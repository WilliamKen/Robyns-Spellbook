**Robyn's Spellbook: A DnD 5e Character Resource Manager
Project Overview**

Robyn's Spellbook is a dynamic web application designed to enhance the Dungeons & Dragons 5th Edition gameplay, serving as a companion tool for managing the character Robyn Lark, a Loremaster Wizard with a compelling backstory. From a frail, one-armed boy who awakened to his magic in a moment of crisis to a dedicated student of the arcane arts, Robyn's journey is one of discovery and mastery. This application supports his adventures by tracking vital character statistics such as Health, Armor Class, and, most crucially, Spells and Spell Slots, leveraging modern web technologies for a seamless user experience.
Technical Highlights
API Integration and Dynamic Content

At the heart of "Robyn's Spellbook" is its ability to fetch and display Robyn's known spells dynamically. This functionality is achieved through:

    External API Calls: The application uses node-fetch to make requests to the DnD 5e API (https://www.dnd5eapi.co/api/spells), retrieving comprehensive details about each spell. This integration ensures that the spell data is up-to-date and accurate, enriching the user experience with detailed spell descriptions, casting times, components, and more.

    Filtering Known Spells: To tailor the content, the application filters the fetched spells against a predefined list of spells known to Robyn Lark (robynsKnownSpells). This step is crucial for maintaining the character's current capabilities and aligning the app with gameplay progress.

**Database Management**

The application employs a MySQL database for persistent storage of spell information, enabling efficient retrieval and management of spell data:

    MySQL Database Connection: Utilizing the mysql package, the application establishes a connection to a MySQL database, configured through environment variables for security (DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE). This approach safeguards sensitive connection details and facilitates deployment across different environments.

    Data Persistence: Upon fetching spell details, the application checks the database to avoid duplicate entries. If a spell isn't already stored, it's inserted into the database, ensuring that the spellbook remains current without unnecessary redundancy.

**Web Server and Frontend Interaction**

    Express.js Web Server: An Express.js server handles HTTP requests, serving spell data from the MySQL database to the frontend. This setup not only decouples the data layer from the presentation layer but also introduces potential for future scalability, such as adding more character-specific features or expanding the user base.

    Dynamic UI Updates: The frontend fetches spell data from the Express.js server and dynamically updates the UI to display spells sorted by level. Each spell component is interactive, with detailed information available on demand and functionalities like casting spells, reflecting the immediate effects on available spell slots.

**Future Directions**

The next development phase will introduce features like dynamic spell alteration, a hallmark of Loremaster Wizards, and leverage React to overhaul the UI, aiming for an intuitive and immersive user experience. Additionally, expanding the database schema to accommodate customizable spells and character-specific modifications will further personalize gameplay.
