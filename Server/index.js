const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel1 = require("./Model/Todo");

const app = express();

app.use(cors());
app.use(express.json());

//conect to DB
mongoose.connect("mongodb://localhost:27017/Test");
//get method
app.get("/get", (req, res) => {
  TodoModel1.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//send New Record to DB
app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel1.create({
    task,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
//update
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  TodoModel1.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
//delete
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  TodoModel1.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.listen(3000, () => {
  console.log("server conected port 3000");
});
