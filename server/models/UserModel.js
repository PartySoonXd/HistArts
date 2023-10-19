const db = require('../db')
const { DataTypes } = require('sequelize')

const User = db.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, require: true},
    password: {type: DataTypes.STRING, require: true},
}, {
    timestamps: false,
})

const Token = db.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, require: true}
})

User.hasOne(Token)
Token.belongsTo(User)

module.exports = {
    User,
    Token
}