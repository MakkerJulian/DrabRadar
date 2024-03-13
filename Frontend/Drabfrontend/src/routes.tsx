import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

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
    }
];