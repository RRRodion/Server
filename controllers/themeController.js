const {Theme, User} = require('../models/models')
const ApiError = require('../error/ApiError')
class themeController {
    async create(req,res){
        const {title} = req.body;
        const theme = await Theme.create({title});
        return res.json(theme)
    }
    async getAll(req,res){
        const theme = await Theme.findAll()
        return res.json(theme)
    }
    async delete(req,res){
        const { id } = req.body;
        const deletedThemeCount = await Theme.destroy({
            where: { id },
        });
        if (deletedThemeCount === 0) {
            return res.status(404).json({ message: 'Пользователь с указанным идентификатором не найден' });
        }
        return res.json({ message: 'Пользователь успешно удален' });
    }
    async getOne(req,res){
        const {id} = req.params
        const theme = await Theme.findOne(
            {where: {id}}
        )
        return res.json(theme)
    }
}

module.exports = new themeController()