import express from 'express'
import { UserRepo } from '../repos/user-repo'
import bcrypt from 'bcryptjs'

const router = express.Router()

router.post('/auth/signup', async (req, res) => {
    const { username, password } = req.body
    const user = await UserRepo.findByUsername(req.body.username)

    if (user) {
        return res.sendStatus(500)
    }
    try {
        const pass = bcrypt.hashSync(password)
        const newUser = await UserRepo.create(username, pass)

        if (newUser) return res.send(newUser)
    } catch (error) {
        res.status(500).send({message: error})
    }
})

export { router }