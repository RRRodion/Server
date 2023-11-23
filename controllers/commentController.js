const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError')
class commentController {
    async create(req,res){
        const {title} = req.body;
        const comment = await Comment.create({title});
        return res.json(comment)
    }
    async getAll(req,res){
        const comment = await Comment.findAll()
        return res.json(comment)
    }
    async delete(req,res){
        const { id } = req.body;
        const deletedCommentCount = await Comment.destroy({
            where: { id },
        });
        if (deletedCommentCount === 0) {
            return res.status(404).json({ message: 'Коммент с указанным идентификатором не найден' });
        }
        return res.json({ message: 'Коммент успешно удален' });
    }
}

module.exports = new commentController()