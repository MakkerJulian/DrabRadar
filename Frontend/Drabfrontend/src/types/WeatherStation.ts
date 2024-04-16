import { Geolocation } from "./Geolocation";
import { Weatherdata } from "./WeatherStationData";
import { Storing } from './Storing.ts';

export type Weatherstation = {
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
    weatherdatas: Weatherdata[];
    storingen: Storing[];
}

export type WeatherstationDetail = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    elevation: number;
    geolocation: Geolocation;
    weatherdatas: Weatherdata;
    current_storing: Storing;
    storingen_log: Storing[];
}