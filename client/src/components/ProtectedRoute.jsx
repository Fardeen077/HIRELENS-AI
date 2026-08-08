import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ProtectedRoute() {
    const isAuth = useAuthStore((s) => s.isAuth);
    const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);

    if (isCheckingAuth) return <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blue-600" />
    </div>;

    if (isAuth) return <Navigate to="/login" replace />;
    return <Outlet />;
}


export default ProtectedRoute