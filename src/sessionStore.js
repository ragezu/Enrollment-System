// sessionStore.js
require('dotenv').config(); // Load environment variables from .env file
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // Ensure this matches your database type
  }
);

// Initialize session store
const sessionStore = new SequelizeStore({
  db: sequelize,
});

// Sync the session store to create the table
sessionStore.sync().then(() => {
  console.log('Session table synced successfully.');
}).catch((error) => {
  console.error('Error syncing session table:', error);
});

module.exports = sessionStore;
