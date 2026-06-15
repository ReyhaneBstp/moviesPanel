import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MoviesPage from "./pages/movies/MoviesPage";
import { DashboardLayout } from "./layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/movies" replace />} />
          <Route path="/dashboard/movies" element={<MoviesPage />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;