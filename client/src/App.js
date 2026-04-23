import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LostItemsPage from "./pages/LostItemsPage";
import FoundItemsPage from "./pages/FoundItemsPage";
import ReportLostItemPage from "./pages/ReportLostItemPage";
import ReportFoundItemPage from "./pages/ReportFoundItemPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import { isAuthenticated } from "./services/authService";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/lost-items" element={<ProtectedRoute><LostItemsPage /></ProtectedRoute>} />
        <Route path="/found-items" element={<ProtectedRoute><FoundItemsPage /></ProtectedRoute>} />
        <Route path="/lost-items/new" element={<ProtectedRoute><ReportLostItemPage /></ProtectedRoute>} />
        <Route path="/found-items/new" element={<ProtectedRoute><ReportFoundItemPage /></ProtectedRoute>} />
        <Route path="/lost-items/:id" element={<ProtectedRoute><ItemDetailsPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
