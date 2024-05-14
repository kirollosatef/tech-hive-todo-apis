import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticateUser, createTodo);
router.get('/', authenticateUser, getTodos);
router.put('/:id', authenticateUser, updateTodo);
router.delete('/:id', authenticateUser, deleteTodo);

export default router;