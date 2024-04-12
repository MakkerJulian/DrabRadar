import { Autocomplete, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Weatherstation } from "../types";
import axiosInstance from "../axios";
import { WeatherStationDetail } from "./WeatherStationDetail";

export const WeatherStationCompare = () => {

    const [weatherStation1, setWeatherStation1] = React.useState<Weatherstation>()
    const [weatherStation2, setWeatherStation2] = React.useState<Weatherstation>()
    const [weatherStations, setWeatherStations] = React.useState<Weatherstation[]>([])

    const name = window.location.pathname.split("/").pop();

    useEffect(() => {
        axiosInstance.get<Weatherstation[]>(`/weatherstation`).then((response) => {
            setWeatherStations(response.data);
        });

        axiosInstance.get<Weatherstation>(`/weatherstation/id/${name}`).then((response) => {
            setWeatherStation1(response.data);
        });
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}
                margin={"12px"}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography variant="h1">Weather Station Compare</Typography>
                </Box>
            </Grid>
            <Grid item xs={6}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Typography variant="h4"> Weatherstation 1</Typography>
                <Autocomplete
                    id="weatherstations"
                    options={weatherStations}
                    sx={{ width: 300 }}
                    value={weatherStation1 ?? null}
                    getOptionLabel={(option) => option.geolocation.country.name + " " + option.name}
                    renderInput={(params) => <TextField {...params} label="Weatherstations" key={params.id} />}
                    onChange={(event, ws) => {
                        ws && setWeatherStation1(ws);
                    }}
                />
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"max-content"}
                >
                    {weatherStation1 && (
                        <WeatherStationDetail ws={weatherStation1}></WeatherStationDetail>
                    )}
                </Box>
            </Grid>
            <Grid item xs={6}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Typography variant="h4"> Weatherstation 2</Typography>
                <Autocomplete
                    id="weatherstations"
                    options={weatherStations}
                    sx={{ width: 300 }}
                    value={weatherStation2 ?? null}
                    getOptionLabel={(option) => option.geolocation.country.name + " " + option.name}
                    renderInput={(params) => <TextField {...params} label="Weatherstations" key={params.id} />}
                    onChange={(event, ws) => { ws && setWeatherStation2(ws); }}
                />
                {weatherStation2 && (
                    <WeatherStationDetail ws={weatherStation2}></WeatherStationDetail>
                )}
            </Grid>
        </Grid>

    );
}