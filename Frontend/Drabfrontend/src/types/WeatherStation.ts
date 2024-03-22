import { Geolocation } from "./Geolocation";
import { Weatherdata } from "./Weatherdata";

export type Weatherstation = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
    weatherdata: Weatherdata;
}