const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");
const sequelize = require("./config/database");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({ path: "http://localhost:5176" }));

//parse oncoming request bodies
app.use(bodyParser.json());

//serving static files form uploads(contains tasks images) directory
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to tasks app api" });
});

// app.listen(PORT, console.log(`server is running on port ${PORT}`));

async function connect() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

//start the server after database connection is established
sequelize.sync().then(() => {
  connect().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
});
