import { CustomerDetails } from "./pages/CustomerDetails";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Sales } from "./pages/Sales";
import { Admin } from "./pages/Admin"
import { WeatherStationDetail } from "./pages/WeatherStationDetail";
import { WeatherStations } from "./pages/WeatherStations";
import { WeatherStationCompare } from "./pages/WeatherStationCompare";

interface Route {
    path: string;
    name: string;
    element: () => JSX.Element;
    requiredRoles?: string[];
}

export const routes: Route[] = [
    {
        name: "home",
        path: "/",
        element: Home,
        requiredRoles: ["ADMIN", "Onderhoud", "Onderzoek"]
    },
    {
        name: 'login',
        path: '/login',
        element: Login,
    },
    {
        name: 'sales',
        path: '/sales',
        element: Sales,
        requiredRoles: ["ADMIN","Sales"]
    },
    {
        name: 'customer',
        path: '/customer/:id',
        element: CustomerDetails,
        requiredRoles: ["ADMIN","Sales"]
    },
    {
        name: 'weatherstations',
        path: '/weatherstations',
        element: WeatherStations,
        requiredRoles: ["ADMIN","Onderhoud","Onderzoek"]
    },
    {
        name: 'admin',
        path: '/admin',
        element: Admin,
        requiredRoles: ["ADMIN"]
    },
    {
        name: 'weatherstation',
        path: '/weatherstation/:id',
        element: WeatherStationDetail,
        requiredRoles: ["ADMIN","Onderhoud","Onderzoek"]
    },
    {
        name: 'weatherstationCompare',
        path: '/weatherstation/compare/:id',
        element: WeatherStationCompare,
        requiredRoles: ["ADMIN","Onderhoud","Onderzoek"]
    }
];