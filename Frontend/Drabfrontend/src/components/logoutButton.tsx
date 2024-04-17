import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const LogoutButton = () => {
    const authenticated = sessionStorage.getItem('token') !== null;
    const navigate = useNavigate();

    const logOut = () => {
        sessionStorage.clear();
        navigate("/login");
    }

    if (authenticated) {
        return (
            <Button style={{margin:'15px', zIndex: 1002, backgroundColor: 'green', color:'white'}} onClick={logOut}>Log out</Button>
        );
    }
}