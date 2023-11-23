const {Collection, User, Theme, Item, Likes, Comment} = require('../models/models')
const ApiError = require('../error/ApiError')
class CollectionController {
    async create(req,res){
        const {title, description, image_url} = req.body;
        const collections = await Collection.create({ title, description, image_url });
        return res.json(collections)
    }
    async getAll(req,res){
        const collections = await Collection.findAll()
        return res.json(collections)
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;

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
            });

            if (!collection) {
                throw ApiError.NotFound(`Collection with id ${id} not found`);
            }

            return res.json(collection);
        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    }
}

module.exports = new CollectionController()