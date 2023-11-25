const {Item, Collection, User, Theme} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ItemController {
    async create(req, res, next) {
        try {
            const {collectionId, title, tags} = req.body
            const {img} = req.files
            let fileName = uuid.v4 + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({collectionId, title, tags, img: fileName})
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const items = await Item.findAll()
        return res.json(items)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const item = await Item.findByPk(id, {
                include: [
                    {
                        model: Collection,
                        attributes: ['id', 'title', 'description', 'image_url', 'optional_params', 'user_id', 'theme_id'],
                    }
                ],
            })

            if (!item) {
                return next(ApiError.badRequest(`Айтем с id ${id} не найден`))
            }
            return res.json(item)
        } catch (error) {
            console.error(error)
            return next(ApiError.internal(`Внутренняя ошибка сервера`))
        }
    }

    async deleteById(req, res, next) {
        const itemId = req.params.id
        try {
            const item = await Item.findByPk(itemId)
            if (!item) {
                return next(ApiError.badRequest(`Айтем не найден`))
            }

            await item.destroy()
            return res.status(204).send()
        } catch (error) {
            console.error(error);
            return next(ApiError.internal(`Внутренняя ошибка сервера`))
        }
    }
}

module.exports = new ItemController()