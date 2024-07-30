require('dotenv').config({path: ".env.local"})
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    "postgres",
    "postgres",
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: "postgres",
    }
)

const postgresInit = async() => {
    try {
        await sequelize.query(`CREATE USER "${process.env.POSTGRES_USER}" WITH PASSWORD '${process.env.POSTGRES_PASSWORD}' SUPERUSER`).then(data => {
            console.log("user created")
        })
        await sequelize.query(`CREATE DATABASE "${process.env.POSTGRES_NAME}"`).then(() => {
            console.log("database successfully initiated!")
            process.exit()
        })
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
postgresInit()