import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const LogoutButton = () => {
    const authenticated = localStorage.getItem('token') !== null;
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    if (authenticated) {
        return (
            <Button style={{margin:'15px', zIndex: 1002, backgroundColor: 'green', color:'white'}} onClick={logOut}>Log out</Button>
        );
    }
}