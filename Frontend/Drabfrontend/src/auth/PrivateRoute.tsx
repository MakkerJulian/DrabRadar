import React from "react";
import { Navigate, Outlet } from "react-router-dom";


export type Route = {
    path: string; // The path to render in the <Route /> component
    name?: string; // Determines whether to render in the menu, remove it to not render
    element: () => JSX.Element; // Element that will render for given route
    requiredRoles?: string[]
}

export const PrivateRoutes = () => {
    const authenticated = sessionStorage.getItem('token') !== null;

    return (
        authenticated ? (
            <Outlet />

        ) : <Navigate to="/login" />
    );
};
