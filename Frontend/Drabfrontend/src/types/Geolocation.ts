import { Country } from ".";

export type Geolocation = {
    id: number;
    island: string;
    county: string;
    place: string;
    hamlet: string;
    town: string;
    municipality: string;
    state_district: string;
    administrative: string;
    state: string;
    village: string;
    region: string;
    province: string;
    city: string;
    locality: string;
    postcode: string;
    country: Country;
}