import { Box, Button } from "@mui/material";
import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminIcon } from "../components/adminBar";
import { jwtDecode } from "jwt-decode";


export type Route = {
    path: string; // The path to render in the <Route /> component
    name?: string; // Determines whether to render in the menu, remove it to not render
    element: () => JSX.Element; // Element that will render for given route
    requiredRoles?: string[]
}

type Props = {
    children: ReactNode;
}

const Layout = ({ children }: Props) => (
    <Box overflow={"hidden"}>
        {jwtDecode(sessionStorage.getItem('token')).role === "ADMIN" && (
            <AdminIcon />
        )}
        {children}
    </Box>
)

export const PrivateRoutes = () => {
    const authenticated = sessionStorage.getItem('token') !== null;

    return (
        authenticated ? (
            <Layout><Outlet /></Layout>

        ) : <Navigate to="/login" />
    );
};
