import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const AuthToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={AuthToken ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/dashboard"
          element={AuthToken ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/onboarding"
          element={AuthToken ? <Onboarding /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
