import "./App.css";
import TaskList from "./components/TaskList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskDetails from "./components/SingleTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList />}></Route>

          <Route path="/task/:taskId" element={<TaskDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
