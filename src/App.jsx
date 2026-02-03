import "./App.css";
import { useAuth } from "./auth/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import GreetingPage from "./pages/greetingPage/GreetingPage";
import MainPage from "./pages/mainPage/MainPage";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<GreetingPage />} />
          <Route
            path="/mainpage"
            element={
              <ProtectedRoute user={user}>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
