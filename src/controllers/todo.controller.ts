import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const userId = res.locals.userId;

    const todo = await prisma.todo.create({
      data: {
        title,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const todos = await prisma.todo.findMany({
      where: { userId },
    });

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const userId = res.locals.userId; // Assuming the user ID is stored in res.locals after authentication

    const todo = await prisma.todo.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        title,
        completed,
      },
    });

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = res.locals.userId; // Assuming the user ID is stored in res.locals after authentication

    const todo = await prisma.todo.deleteMany({
      where: {
        id,
        userId,
      },
    });

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};