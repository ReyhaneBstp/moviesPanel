import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./layout/Layout";
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
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard/movies" replace />}
            />
            <Route path="/dashboard/" element={<HomePage />} />
            <Route path="/dashboard/movies" element={<MoviesPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      {snackbar.isOpen && <Snackbar />}
      {confirmDialog.isOpen && <ConfirmDialog />}
    </>
  );
}

export default App;
