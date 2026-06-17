import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Snackbar } from "@/shared/components/Snackbar";
import { useGlobalStore } from "@/shared/store/useGlobalStore";
import MoviesPage from "./pages/movies/MoviesPage";
import { ConfirmDialog } from "./shared/components/ConfirmDialog";
import HomePage from "./pages/home/HomePage";

function App() {
  const { snackbar, confirmDialog } = useGlobalStore();
  return (
    <>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard/movies" replace />}
            />
            <Route path="/dashboard/" element={<HomePage />} />
            <Route path="/dashboard/movies" element={<MoviesPage />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
      {snackbar.isOpen && <Snackbar />}
      {confirmDialog.isOpen && <ConfirmDialog />}
    </>
  );
}

export default App;
