import { Geolocation } from "./Geolocation";
import { Weatherdata } from "./WeatherStationData";

export type Weatherstation = {
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
    weatherdatas: Weatherdata[];
}

export type WeatherstationDetail = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
    weatherdatas: Weatherdata[];
}