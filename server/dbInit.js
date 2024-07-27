require('dotenv').config({path: ".env.local"})
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    "postgres",
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
    }
)

const dbInit = async() => {
    await sequelize.query(`CREATE DATABASE "${process.env.POSTGRES_NAME}"`).then(() => {
        console.log("database successfully initiated!")
        process.exit()
    }).catch(error => {
        console.log(error)
        process.exit()
    })
}

dbInit()