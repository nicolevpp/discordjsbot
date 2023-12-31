const db = require(".")

const createUsersTable = async () => {
    db.prepare('DROP TABLE IF EXISTS users').run();

    db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        discord_id TEXT PRIMARY KEY,
        name TEXT NOT NULL
    ) 
`).run();
};

//


const createNotesTable = async () => {
    db.prepare('DROP TABLE IF EXISTS notes').run();

    db.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
        note_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        likes INTEGER DEFAULT 0,
        discord_id TEXT NOT NULL,
        FOREIGN KEY (discord_id)
            REFERENCES users (discord_id)
            ON DELETE CASCADE
    ) 
`).run();
};

const createTables = async () => {
    await createUsersTable();
    console.log('Tabla de usuarios creadas');
    await createNotesTable();
    console.log('Tabla de notas creadas');
    console.log('Tablas creadas');

};

createTables();



