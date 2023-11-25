const {Collection, User, Theme, Item, Likes, Comment} = require('../models/models')
const ApiError = require('../error/ApiError')

class CollectionController {
    async create(req, res) {
        const {title, description, image_url, user_id, theme_id} = req.body
        const collections = await Collection.create({title, description, image_url, user_id, theme_id})
        return res.json(collections)
    }

    async getAll(req, res) {
        const collections = await Collection.findAll()
        return res.json(collections)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const collection = await Collection.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'role', 'language', 'theme'],
                    },
                    {
                        model: Theme,
                        attributes: ['id', 'title'],
                    }
                ],
            })

            if (!collection) {
                return next(ApiError.badRequest(`Коллекция с id ${id} не найдена`))
            }
            return res.json(collection);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal(`Внутренняя ошибка сервера`))
        }
    }

    async deleteById(req, res, next) {
        const collectionId = req.params.id;
        try {
            const collection = await Collection.findByPk(collectionId);
            if (!collection) {
                return next(ApiError.badRequest(`Коллекция не найдена`))
            }

            await collection.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return next(ApiError.internal(`Внутренняя ошибка сервера`))
        }
    }
}

module.exports = new CollectionController()