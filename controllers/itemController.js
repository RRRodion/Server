const {Item} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ItemController {
    async create(req,res,next){
        try {
            const {collectionId, title, tags} = req.body
            const {img} = req.files
            let fileName = uuid.v4 + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const item = await Item.create({collectionId, title, tags, img:fileName})

            return res.json(item)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req,res){
        const{collectionId} = req.query
        let items;
        /*if(){

        }*/
    }
    async getOne(req,res){
        /*const {id} = req.params
        const item = await Item.findOne(
            {where: {id},
            include:[{model:}]}
        )
        return */
    }

}

module.exports = new ItemController()