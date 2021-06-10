const mongoose = require("mongoose");
const User = require("./userSchema")

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    
  },
},{
  timestamps: true
});

const Note = mongoose.model("Notes", noteSchema);

module.exports = Note;
