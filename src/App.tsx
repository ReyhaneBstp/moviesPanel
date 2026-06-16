import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Snackbar } from "@/shared/components/Snackbar";
import { useGlobalStore } from "@/shared/store/useGlobalStore";
import MoviesPage from "./pages/movies/MoviesPage";

function App() {
  const { snackbar, hideSnackbar } = useGlobalStore();

  return (
    <>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/movies" replace />} />
            <Route path="/dashboard/movies" element={<MoviesPage />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
      <Snackbar
        message={snackbar.message}
        isOpen={snackbar.isOpen}
        onClose={hideSnackbar}
        severity={snackbar.severity}
      />
    </>
  );
}

export default App;
