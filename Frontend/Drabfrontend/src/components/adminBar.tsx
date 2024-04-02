import { Box, Button, Drawer, IconButton } from "@mui/material";
import React from "react";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";

export const AdminIcon = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const forbiddenRoutes = ["login", 'customer', 'weatherstation']
    return (
        <Box>
            <IconButton onClick={() => setOpen(!open)} sx={{ position: "absolute", zIndex: 1000, left: 10, bottom: 10}}>
                <AdminPanelSettingsIcon sx={{ color: 'red' }} />
            </IconButton>

            <Drawer open={open} ModalProps={{ onBackdropClick: () => setOpen(false) }} >
                {routes.map(route => {
                    return !forbiddenRoutes.includes(route.name) &&(
                    <Button key={route.path} onClick={() => navigate(route.path)} sx={{ backgroundColor: "green", color: "white", borderRadius: 0 }}>
                        {route.name}
                    </Button>
                )})}
            </Drawer>
        </Box>
    )
}