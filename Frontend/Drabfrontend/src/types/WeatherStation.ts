import { Geolocation } from "./Geolocation";

export type Weatherstation = {
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
}