const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User, Theme} = require('../models/models')

const generateJwt = (id, username, role) => {
    return jwt.sign({id, username, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {username, password, role, theme, language} = req.body
        if (!username || !password) {
            return next(ApiError.badRequest('Некорректный username или password'))
        }

        const candidate = await User.findOne({where: {username}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким username уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, password: hashPassword, role, theme, language})
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {username, password} = req.body
        const user = await User.findOne({where: {username}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.username, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const user = await User.findAll()
        return res.json(user)
    }

    async deleteById(req, res, next) {
        const userId = req.params.id;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'))
            }

            await user.destroy()
            return res.status(204).send()
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Внутренняя ошибка сервера'))
        }
    }
}

module.exports = new UserController()