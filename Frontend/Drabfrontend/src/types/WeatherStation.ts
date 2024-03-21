import { Geolocation } from "./Geolocation";

export type Weatherstation = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
}