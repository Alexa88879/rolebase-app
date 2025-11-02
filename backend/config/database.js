const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', '..', 'users.db');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize database schema
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('admin', 'student')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err.message);
          reject(err);
        }
      });

      // Check if admin exists
      db.get('SELECT * FROM users WHERE role = ?', ['admin'], async (err, row) => {
        if (err) {
          console.error('Error checking for admin:', err.message);
          reject(err);
        } else if (!row) {
          // Create default admin user
          const hashedPassword = await bcrypt.hash('admin123', 10);
          db.run(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            ['admin', hashedPassword, 'admin'],
            (err) => {
              if (err) {
                console.error('Error creating admin user:', err.message);
                reject(err);
              } else {
                console.log('Default admin user created. Check documentation for default credentials.');
                resolve();
              }
            }
          );
        } else {
          console.log('Admin user already exists');
          resolve();
        }
      });
    });
  });
};

module.exports = { db, initializeDatabase };
