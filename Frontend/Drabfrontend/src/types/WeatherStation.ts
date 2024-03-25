import { Geolocation } from "./Geolocation";
import { Weatherdatas } from "./Weatherdata";

export type Weatherstation = {
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
    weatherdatas: Weatherdatas[];
}

export type WeatherstationDetail = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
    weatherdatas: Weatherdatas;
}