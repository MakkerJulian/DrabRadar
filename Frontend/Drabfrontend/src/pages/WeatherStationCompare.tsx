import { Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Weatherstation } from "../types";
import axiosInstance from "../axios";
import { WeatherStationDetail } from "./WeatherStationDetail";
import { compareCalulation } from "../util/comparecalculation";
import { useNavigate } from "react-router-dom";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'; //freezing
import WaterDropIcon from '@mui/icons-material/WaterDrop';//rain
import AcUnitIcon from '@mui/icons-material/AcUnit'; //snow
import SevereColdIcon from '@mui/icons-material/SevereCold'; //hail
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'; //thunder
import TornadoIcon from '@mui/icons-material/Tornado'; //Tornado
import { CompareCard } from "../components/CompareCard";

export const WeatherStationCompare = () => {
    const [weatherStation1, setWeatherStation1] = React.useState<Weatherstation>()
    const [weatherStation2, setWeatherStation2] = React.useState<Weatherstation>()
    const [weatherStations, setWeatherStations] = React.useState<Weatherstation[]>([]);

    let calculated = {
        elDiff: "",
        latDiff: "",
        longDiff: "",
        tempDiff: ""
    }

    const name = window.location.pathname.split("/").pop() ?? "";

    useEffect(() => {
        axiosInstance.get<Weatherstation[]>(`/weatherstation`).then((response) => {
            setWeatherStations(response.data);
        });

        if (Number.parseInt(name)) {
            axiosInstance.get<Weatherstation>(`/weatherstation/id/${name}`).then((response) => {
                setWeatherStation1(response.data);
            });
        }
    }, []);

    const navigate = useNavigate();

    if (weatherStation1 && weatherStation2) {
        calculated = compareCalulation(weatherStation1, weatherStation2);
    }

    const lastWeatherdataW1 = weatherStation1?.weatherdatas[weatherStation1.weatherdatas.length - 1];
    const lastWeatherdataW2 = weatherStation2?.weatherdatas[weatherStation2.weatherdatas.length - 1];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography variant="h1">Weather Station Compare</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Button
                    sx={{
                        backgroundColor: 'green',
                        width: "5vw",
                        color: 'white',
                        position: "absolute",
                        left: "1vw",
                        top: "1vh",
                        ":hover": {
                            backgroundColor: 'darkgreen',
                        }
                    }}
                    onClick={() => navigate('/weatherstations')
                    }>
                    Back
                </Button>
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
                    sx={{ width: 300, mb: 2 }}
                    value={weatherStation1 ?? null}
                    getOptionLabel={(option) => option.geolocation.country.name + " " + option.name}
                    renderInput={(params) => <TextField {...params} label="Weatherstations" key={params.id} />}
                    onChange={(event, ws) => {
                        ws && setWeatherStation1(ws);
                    }}
                />
                {weatherStation1 && (
                    <WeatherStationDetail ws={weatherStation1}></WeatherStationDetail>
                )}
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
                    sx={{ width: 300, mb: 2 }}
                    value={weatherStation2 ?? null}
                    getOptionLabel={(option) => option.geolocation.country.name + " " + option.name}
                    renderInput={(params) => <TextField {...params} label="Weatherstations" key={params.id} />}
                    onChange={(event, ws) => { ws && setWeatherStation2(ws); }}
                />
                {weatherStation2 && (
                    <WeatherStationDetail ws={weatherStation2}></WeatherStationDetail>
                )}
            </Grid>

            <Grid item xs={12}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography variant="h4"> Compare Weatherstations</Typography>
                    <Typography variant="h6">Distance between weatherstations</Typography>

                </Box>
                {weatherStation1 && weatherStation2 && (
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                        <CompareCard title={"Longitude"} value={calculated.longDiff + "°"} />
                        <CompareCard title={"Latitude"} value={calculated.latDiff + "°"} />
                        <CompareCard title={"Elevation"} value={calculated.elDiff + " M"} />
                        {lastWeatherdataW1 && lastWeatherdataW2 && (
                            <>
                                <CompareCard title={"Temperature"} value={calculated.tempDiff} />

                                <CompareCard title="Special" value="" overflow="auto">

                                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                                        <Box display={'flex'} flexDirection={'column'}>
                                            {lastWeatherdataW1.freezing ? <DeviceThermostatIcon color="success" /> : <DeviceThermostatIcon color="error" />}
                                            {lastWeatherdataW1.rain ? <WaterDropIcon color="success" /> : <WaterDropIcon color="error" />}
                                            {lastWeatherdataW1.snow ? <AcUnitIcon color="success" /> : <AcUnitIcon color="error" />}
                                            {lastWeatherdataW1.hail ? <SevereColdIcon color="success" /> : <SevereColdIcon color="error" />}
                                            {lastWeatherdataW1.thunder ? <ThunderstormIcon color="success" /> : <ThunderstormIcon color="error" />}
                                            {lastWeatherdataW1.tornado ? <TornadoIcon color="success" /> : <TornadoIcon color="error" />}
                                        </Box>
                                        <Box display={'flex'} flexDirection={'column'}>
                                            {lastWeatherdataW2.freezing ? <DeviceThermostatIcon color="success" /> : <DeviceThermostatIcon color="error" />}
                                            {lastWeatherdataW2.rain ? <WaterDropIcon color="success" /> : <WaterDropIcon color="error" />}
                                            {lastWeatherdataW2.snow ? <AcUnitIcon color="success" /> : <AcUnitIcon color="error" />}
                                            {lastWeatherdataW2.hail ? <SevereColdIcon color="success" /> : <SevereColdIcon color="error" />}
                                            {lastWeatherdataW2.thunder ? <ThunderstormIcon color="success" /> : <ThunderstormIcon color="error" />}
                                            {lastWeatherdataW2.tornado ? <TornadoIcon color="success" /> : <TornadoIcon color="error" />}
                                        </Box>
                                    </Box>
                                </CompareCard>
                            </>
                        )}
                    </Box>
                )}
            </Grid>
        </Grid >

    );
}