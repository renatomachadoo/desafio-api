const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController{
    async update(request, response){
        const user_id = request.user.id
        const avatarFileName = request.file.filename

        const diskStorage = new DiskStorage

        const user = await knex("users").where({ id : user_id }).first()

        if(!user){
            throw new AppError("Utilizador não encontrado", 401)
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar)
        }

        const fileName = await diskStorage.saveFile(avatarFileName)
        user.avatar = fileName

        await knex("user").update(user).where({ id : user_id })

        return response.json({ avatar : user.avatar})
    }
}

module.exports = UserAvatarController