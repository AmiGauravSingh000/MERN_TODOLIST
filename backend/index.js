require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "Todo deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting todo:", err);
      res.status(500).json({ error: "Error deleting todo" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
