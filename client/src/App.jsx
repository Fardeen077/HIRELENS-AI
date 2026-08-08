import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import DashboardLayout from "./components/DashboardLayout";
import useAuthStore from "./store/useAuthStore";

function App() {
    const getMe = useAuthStore((s) => s.getme);

    useEffect(() => {
        getMe().catch(() => {});
    }, [getMe]);

    return (
        <BrowserRouter>
            <Routes>
                {/* PROTECTED */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                </Route>

                {/* PUBLIC */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* FALLBACK */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;