import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  boardId: {
    type: String,
    required: true,
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  timestamp: {
    type: String,
    default: Date.now(),
  }
});

export const Board = mongoose.model("Board", BoardSchema);
