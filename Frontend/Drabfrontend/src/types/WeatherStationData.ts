import { Weatherstation } from ".";

export type Weatherdata = {
    id: number;
    weatherstation: Weatherstation;
    datetime: string;
    temp: number
    dew_point: number;
    s_airpressure: number;
    sea_airpressure: number;
    visibility: number;
    windspeed: number;
    precipitation: number;
    snow_amount: number;
    freezing: boolean;
    rain: boolean;
    snow: boolean;
    hail: boolean;
    thunder: boolean;
    tornado: boolean;
    clouds: number;
    wind_direction: number;
}