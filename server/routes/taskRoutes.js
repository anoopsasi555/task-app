const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const upload = require("../multer/multer");

router.post("/", upload.single("image"), taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", upload.single("image"), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
