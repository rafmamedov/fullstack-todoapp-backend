import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  inProcess: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
  boardId: {
    type: String,
    required: true,
  },
});

export const Todo = mongoose.model("Todo", TodoSchema);
