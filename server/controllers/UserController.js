const UserService = require('../services/UserService')

class UserController {
    async register (req, res, next) {
        try {
            const {username, password} = req.body
            const userData = await UserService.register(password, username)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: "Strict", secure: true, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const userData = await UserService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 86400 * 1000, sameSite: "Strict", secure: true, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    
    async logout (req, res, next) {
        try {
            const refreshToken = req.cookies['refreshToken'];
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }
    
    async check(req, res, next) {
        try {
            const refreshToken = req.cookies['refreshToken']
            const userData = await UserService.check(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: "Strict", secure: true, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()