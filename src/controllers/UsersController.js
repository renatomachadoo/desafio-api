const { hash, compare } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UsersController{
    async create(request, response){
        const {name, email, password} = request.body

        if(!name || !email || !password){
            throw new AppError("Os campos devem estar todos preenchidos.", 401)
        }

        const checkUserExists = await knex("users").where({ email }).first()

        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso.")
        }

        const hashedPassword = await hash(password, 8)

        await knex("users").insert({
            name,
            email,
            password : hashedPassword,
            avatar
        })

        return response.status(201).json()
    }

    async update(request, response){
        const { name, email, old_password, new_password} = request.body
        const user_id = request.user.id

        const user = await knex("users").where({ id : user_id }).first()

        if(!user){
            throw new AppError("Utilizador não encontrado.", 401)
        }

        const userWithEmail = await knex("users").where({ email }).first()

        if(userWithEmail && userWithEmail.id !== user.id){
            throw new AppError("Este e-mail já está a ser utilizado.", 401)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(new_password && !old_password){
            throw new AppError("É necessário confirmar a palavra-passe antiga para alterar a palavra-passe.", 401)
        }

        if(new_password && old_password){
            const passwordMatched = await compare(old_password, user.password)

            if(!passwordMatched){
                throw new AppError("As palavras-passe não coincidem.")
            }

            user.password = await hash(new_password, 8) 
        }

        await knex("users").update(user).where({ id : user_id })

        return response.json({ user })
    }
}

module.exports = UsersController