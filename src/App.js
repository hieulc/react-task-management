import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Nav";
import BoardPage from "./pages/BoardPage";
import TemplatePage from "./pages/TemplatePage";
import BoardDetailPage from "./pages/BoardDetailPage";
import RegisterPage from "./pages/RegisterPage";
import useToken from "./hooks/useToken";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { token, setToken, logout, user, setUser } = useToken();

  if (token === "" || !token) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<LoginForm setToken={setToken} setUser={setUser} />}
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<Navigate to={-1} />} />
        </Routes>
      </div>
    );
  } else {
    return (
      // <DndProvider backend={HTML5Backend}>
      <div className="main_content">
        <div className="nav_container">
          <Navbar logout={logout} />
        </div>
        <div className="flex flex-row">
          <SideBar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Navigate to="/boards" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/boards">
                <Route index element={<BoardPage />} />
                <Route path=":id" element={<BoardDetailPage />} />
              </Route>
              <Route path="/admin" element={<TemplatePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
      // </DndProvider>
    );
  }
}

export default App;
