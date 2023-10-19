const db = require('../db')
const { DataTypes } = require('sequelize')

const Citate = db.define('citates', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    author: {type: DataTypes.STRING},
}, {
    timestamps: false
})

// class Citate extends Model {}
// Citate.init({
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     text: {type: DataTypes.STRING},
//     author: {type: DataTypes.STRING},
//   }, {
//     timestamps: false,
//     sequelize, // We need to pass the connection instance
//     modelName: 'User' // We need to choose the model name
//   });

module.exports = Citate