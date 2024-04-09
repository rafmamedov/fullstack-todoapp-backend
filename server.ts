import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { Todo } from './models/Todo'; 
import { Board } from './models/Board';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const ObjectId = mongoose.Types.ObjectId;
const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MONGODB_URI not found in environment variables");
  process.exit(1);
}

// Підключення до MongoDB за допомогою Mongoose
mongoose.connect(mongoURI)
.then(() => console.log("Connected to DB"))
.catch(console.error);

app.post('/todos', async (req, res) => {
  const { boardId } = req.body;

  try {
    let board = await Board.findOne({ boardId });

    if (!board) {
      board = new Board({ boardId, todos: [] });
      await board.save();
    }
    
    return res.status(200).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post('/todos/add', async (req, res) => {
  const { boardId, text, description } = req.body;

  if (!boardId || !text) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let board = await Board.findOne({ boardId: boardId });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const newTodo = new Todo({ text, description, boardId });

    await newTodo.save();

    board.todos.push(newTodo._id);
  
    await board.save();

    return res.json(board.todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/todos/:boardId', async (req, res) => {
  const { boardId } = req.params;

  try {
    const board = await Board.findOne({ boardId: boardId }).populate('todos');

    if (!board) {
      return res.status(200).json({ message: "Board not found" });
    }

    res.json(board.todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete('/todos/delete/:boardId/:todoId', async (req, res) => {
  const { boardId, todoId } = req.params;

  try {
    const todoObjectId = new ObjectId(todoId);
    const board = await Board.findOne({ boardId: boardId });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const index = board.todos.findIndex(todo => todo._id.toString() === todoObjectId.toString());

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    board.todos.splice(index, 1);

    await board.save();
    await Todo.findByIdAndDelete(todoId);

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put('/todos/update/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const { text, description, complete, inProcess } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { text, description, complete, inProcess },
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log((`Server started on port ${PORT}`)));
