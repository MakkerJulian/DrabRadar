import { Home } from "./pages/Home";

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
    }
];