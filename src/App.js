import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import DashboardLayout from "./layouts/DashboardLayout";
import Departments from "./pages/Departments";
import Teams from "./pages/Teams";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Main />} />
        <Route path="users" element={<Users />} />
        <Route path="projects" element={<Projects />} />
        <Route path="departments" element={<Departments />} />
        <Route path="teams" element={<Teams />} />
      </Route>
    </Routes>
  );
}

export default App;
