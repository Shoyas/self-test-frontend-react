import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textElements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";

import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/Login/Login";
import Home from "./pages/common/Home/Home";
import Register from "./pages/common/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
