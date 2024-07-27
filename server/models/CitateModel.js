const {db} = require('../db')
const { DataTypes } = require('sequelize')

const Citate = db.define('citates', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    author: {type: DataTypes.STRING},
}, {
    timestamps: false
})

module.exports = Citate