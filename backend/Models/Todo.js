const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false,
  },
});

const TodoModel = mongoose.model("to_do_list", TodoSchema);

module.exports = TodoModel;
