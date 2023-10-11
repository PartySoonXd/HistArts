const db = require('../db')
const { DataTypes } = require('sequelize')

const Subscriber = db.sequelize.define('subscriber', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, require: true, unique: true},
}, {
    timestamps: false
})

module.exports = Subscriber