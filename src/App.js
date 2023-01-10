import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginJira from "./pages/Login/LoginJira";
import Register from "./pages/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import HomeJiraTemplate from "./templates/HomeJiraTemplate";
import ProjectAll from "./pages/ProjectAll/ProjectAll";
import CreateProject from "./pages/CreateProject/CreateProject";
import { useSelector } from "react-redux";
import SpinnerLoading from "./components/SpinnerLoading/SpinnerLoading";

function App() {
  const { show } = useSelector((state) => state.LoadingSpinner);

  return (
    <BrowserRouter>
      <ToastContainer />
      {show && <SpinnerLoading />}

      <Routes>
        <Route path="*" element={<Navigate to="" />} />
        <Route path="" element={<LoginJira />} />
        <Route path="/register" element={<Register />} />
        <Route element={<HomeJiraTemplate />}>
          <Route path="/projectall" element={<ProjectAll />} />
          <Route path="/createproject" element={<CreateProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
