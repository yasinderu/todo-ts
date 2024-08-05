import express from 'express'
import { TodoRepo } from '../repos/todo-repo'

const router = express.Router()

router.get("/todos", async (req, res) => {
    try {
        const todos = await TodoRepo.findAll();

        res.send(todos)   
    } catch (error) {
        res.status(500).send({message: error})
    }
})

router.get("/todo/:user_id", async (req, res) => {
    const { user_id } = req.params
    try {
        const todos = await TodoRepo.findByUserId(user_id)

        res.send(todos)
        
    } catch (error) {
        res.status(500).send({message: error})
    }
})

export { router }