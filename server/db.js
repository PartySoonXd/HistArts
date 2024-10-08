require('dotenv').config()
const { Sequelize } = require('sequelize');

const db = new Sequelize(
    process.env.POSTGRES_NAME,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
    }
)

module.exports = {db}