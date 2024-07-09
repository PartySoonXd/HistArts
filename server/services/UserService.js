const {User} = require('../models/UserModel')
const TokenService = require('./TokenService')
const ApiError = require('../exceptions/ApiError')
const bcrypt = require('bcrypt')

class UserService {
    async register(password, username) {
        const users = await this.getUsersCount()
        if(users >= 1) {
            throw ApiError.BadRequest('Admin user already created. Please login.')
        }
        const hashPass = await bcrypt.hash(password, 3)
        const user = await User.create({password: hashPass, username})

        const tokens = TokenService.generateJWT({username, password})
        await TokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, username, password}
    }

    async login(username, password) {
        const user = await User.findOne({where: {username}})
        if (!user) {
            throw ApiError.BadRequest('Uncorrect username or password')
        }

        const isPassEquals = bcrypt.compareSync(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Uncorrect username or password')
        }
        
        const tokens = TokenService.generateJWT({username, password})
    
        await TokenService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user}
    }
    
    async logout (refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }
    
    async check(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await TokenService.validateRefreshToken(refreshToken)
        const dbToken = await TokenService.findToken(refreshToken)
        if (!dbToken || !userData) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({where: userData.id})
        console.log(userData.id)
        const username = user.username
        const password = user.password
        const tokens = TokenService.generateJWT({username, password})
        
        await TokenService.saveToken(user.id, tokens.refreshToken)
        
        return {...tokens, user}
    }

    async getUsersCount() {
        const users = await User.findAll()
        return users.length
    }
}

module.exports = new UserService()