require('dotenv').config()
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.POSTGRES_DB, 
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
    }
)

module.exports = sequelize