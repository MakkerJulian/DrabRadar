import { CustomerDetails } from "./pages/CustomerDetails";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Sales } from "./pages/Sales";
import { WeatherStations } from "./pages/WeatherStations";

interface Route {
    path: string;
    name: string;
    element: () => JSX.Element;
}

export const routes: Route[] = [
    {
        name: "home",
        path: "/",
        element: Home,
    },
    {
        name: 'login',
        path: '/login',
        element: Login,
    },
    {
        name: 'sales',
        path: '/sales',
        element: Sales
    },
    {
        name: 'customer',
        path: '/customer/:id',
        element: CustomerDetails
    },
    {
        name: 'weatherstations',
        path: '/weatherstations',
        element: WeatherStations
    }
];