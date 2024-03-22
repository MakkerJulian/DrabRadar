import { Subscription } from "./Subscription";
import { Weatherstation } from "./WeatherStation";

export type Contract = {
    id: number;
    subscription: Subscription;
    level: number;
    weatherstations: Weatherstation[];
}