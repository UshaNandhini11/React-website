import { Navigate, Outlet } from "react-router";
import AppDrawer from "../components/Home/AppDrawer";

export default function PrivateRouter() {
    const token = localStorage.getItem('token')

    return token ? (<>
        <AppDrawer />
        <Outlet />
    </>

    ) : (
        <Navigate to="/login" />
    )

} 