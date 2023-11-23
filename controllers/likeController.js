const {Likes} = require('../models/models')
const ApiError = require('../error/ApiError')
class likeController {
    async create(req,res){
        const {title} = req.body;
        const like = await Likes.create({title});
        return res.json(like)
    }
    async getAll(req,res){
        const like = await Likes.findAll()
        return res.json(like)
    }
    async delete(req,res){
        const { id } = req.body;
        const deletedLikeCount = await Likes.destroy({
            where: { id },
        });
        if (deletedLikeCount === 0) {
            return res.status(404).json({ message: 'Лайк с указанным идентификатором не найден' });
        }
        return res.json({ message: 'Лайк успешно удален' });
    }
}

module.exports = new likeController()