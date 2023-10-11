const jwt = require('jsonwebtoken')
const {Token} = require('../models/UserModel')

class TokenService {
    generateJWT (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await Token.findOne({id: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({id: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData;
    }
    
    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            return userData;
        } catch (e) {
            return null;
        }
    }
    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({where: {refreshToken}})
        return token
    }
}

module.exports = new TokenService()