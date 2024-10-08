import express from "express";
import { TodoRepo } from "../repos/todo-repo";
import { authorize } from "./auth";

const router = express.Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await TodoRepo.findAll();
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.get("/todos/:userId", authorize, async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await TodoRepo.findByUserId(userId);

    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.put("/todos/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const todos = await TodoRepo.update(
      {
        content,
      },
      id
    );

    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post("/todos", async (req, res) => {
  try {
    const { id } = req.user;
    const todoObj = {
      content: req.body.content,
      userId: id,
    };
    const addedTodo = await TodoRepo.create(todoObj);

    res.status(200).send(addedTodo);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await TodoRepo.delete(id);

    return res.status(200).send(deletedTodo);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export { router };
