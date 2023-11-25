const ApiError = require('../error/ApiError')
const {Theme, User, Item} = require('../models/models')

class themeController {
    async create(req, res) {
        const {title} = req.body
        const theme = await Theme.create({title})
        return res.json(theme)
    }

    async getAll(req, res) {
        const theme = await Theme.findAll()
        return res.json(theme)
    }

    async deleteById(req, res, next) {
        const themeId = req.params.id
        try {
            const theme = await Theme.findByPk(themeId)
            if (!theme) {
                return next(ApiError.badRequest('Тема не найдена'))
            }

            await theme.destroy()
            return res.status(204).send()
        } catch (error) {
            console.error(error)
            return next(ApiError.internal('Внутренняя ошибка сервера'))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const theme = await Theme.findOne({where: {id}})
        return res.json(theme)
    }
}

module.exports = new themeController()