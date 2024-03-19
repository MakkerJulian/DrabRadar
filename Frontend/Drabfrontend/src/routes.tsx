import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Sales } from "./pages/Sales";

interface Route {
    path: string;
    name: string;
    element: ()=>JSX.Element;
}

export const routes: Route[] = [
    {
        name:"home",
        path:"/",
        element: Home,
    },
    {
        name:'login',
        path:'/login',
        element: Login,
    },
    {
        name:'sales',
        path:'/sales',
        element: Sales
    }
];