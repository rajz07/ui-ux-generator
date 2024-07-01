const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the database file
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Drop the existing user_options table if it exists
db.serialize(() => {
    db.run('DROP TABLE IF EXISTS user_options', (err) => {
        if (err) {
            console.error('Error dropping table:', err);
        } else {
            console.log('Table "user_options" dropped successfully.');
        }
    });

    // Create the user_options table with the new schema
    db.run(`CREATE TABLE IF NOT EXISTS user_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        templateName TEXT,
        uiType TEXT,
        category TEXT,
        color TEXT,
        theme TEXT,
        background TEXT,
        htmlContent TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table "user_options" created successfully.');
        }
    });
});

module.exports = db;
