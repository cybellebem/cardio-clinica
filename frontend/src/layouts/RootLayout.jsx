import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "./RootLayout.css"

export default function RootLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const { pessoa, loading } = useAuth()

    if (loading) return null;
    if (!pessoa) return <Navigate to="/login" replace />

    return (
        <div className={`dashboard-container ${collapsed ? "collapsed" : ""}`}>
            <Sidebar />

            <div className="content-area">
                <Header
                    toggleSidebar={() => setCollapsed(!collapsed)}
                    collapsed={collapsed}
                />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}