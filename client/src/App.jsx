import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

    return (
        <BrowserRouter>
            <Routers>
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
                <Route path="*" element={< NotFound />} />
            </Routers>
        </BrowserRouter>
    )
}
export default App;