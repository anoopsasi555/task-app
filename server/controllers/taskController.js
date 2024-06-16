const Task = require("../models/task");

exports.createTask = async (req, res) => {
  try {
    const { heading, description, date, time, priority } = req.body;
    const image = req?.file?.path || null;

    const newTask = await Task.create({
      heading,
      description,
      date,
      time,
      image,
      priority,
    });

    res.status(201).json({ ...newTask });
  } catch (err) {
    console.log("createTaskErr", err);
    res.status(400).json({ error: err?.errors?.[0]?.message || "Bad Request" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const image = req?.file?.path || null;
  //assigning image to update data only if new image uploaded
  if (image) {
    Object.assign(updateData, { image });
  }
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      await task.update(updateData);
      res.json(task);
    }
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ error: "Bad Request" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      await task.destroy();
      res.json({ message: "Task deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
