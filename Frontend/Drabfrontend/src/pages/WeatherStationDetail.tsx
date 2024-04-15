import { Box, Button, Grid, Typography } from "@mui/material"
import { Weatherstation } from "../types";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Malfunction, weatherstation as stationImage } from "../assets";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'; //freezing
import WaterDropIcon from '@mui/icons-material/WaterDrop';//rain
import AcUnitIcon from '@mui/icons-material/AcUnit'; //snow
import SevereColdIcon from '@mui/icons-material/SevereCold'; //hail
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'; //thunder
import TornadoIcon from '@mui/icons-material/Tornado'; //Tornado

type Props = {
    ws?: Weatherstation;
}
export const WeatherStationDetail = ({ ws }: Props) => {

    const [weatherstation, setWeatherstation] = useState<Weatherstation>();
    const navigate = useNavigate();

    useEffect(() => {
        if(ws) return setWeatherstation(ws);
        const id = window.location.pathname.split("/").pop();
        axiosInstance.get<Weatherstation>(`/weatherstation/id/${id}`).then((response) => {
            setWeatherstation(response.data);
        }).catch(() => {
            enqueueSnackbar('Failed to fetch weatherstation', { variant: 'error' });
        });
    }, [ws]);


    const columns: GridColDef[] = [
        {
            field: 'datetime', flex: 1, headerName: 'Date',
        },
        {
            field: 'temp', flex: 1, headerName: 'Temp',
        },
        {
            field: 'dew_point', flex: 1, headerName: 'Dew',
        },
        {
            field: 's_airpressure', flex: 1, headerName: 'Station AirPressure',
        },
        {
            field: 'sea_airpressure', flex: 1, headerName: 'Sea AirPressure',
        },
        {
            field: 'visibility', flex: 1, headerName: 'Visibility',
        },
        {
            field: 'windspeed', flex: 1, headerName: 'Wind Speed',
        },
        {
            field: 'precipitation', flex: 1, headerName: 'Precipitation',
        },
        {
            field: 'snow_amount', flex: 1, headerName: 'Snow Amount',
        },
        {
            field: 'wind_direction', flex: 1, headerName: 'Wind Direction',
        },
        {
            field: 'clouds', flex: 1, headerName: 'Clouds',
        },
        {
            field: 'special', flex: 1, headerName: 'Special',
            renderCell: (params) => (
                <>
                    {params.row.freezing ? <DeviceThermostatIcon /> : null}
                    {params.row.rain ? <WaterDropIcon /> : null}
                    {params.row.snow ? <AcUnitIcon /> : null}
                    {params.row.hail ? <SevereColdIcon /> : null}
                    {params.row.thunder ? <ThunderstormIcon /> : null}
                    {params.row.tornado ? <TornadoIcon /> : null}
                </>
            )
        }
    ];

    return weatherstation ? (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <h1>Weather Station Detail</h1>
            </Grid>
            {ws === undefined && (
                <Grid item xs={12}>
                    <Button
                        sx={{
                            backgroundColor: 'green',
                            width: "20%",
                            color: 'white',
                            ":hover": {
                                backgroundColor: 'darkgreen',
                            }
                        }}
                        onClick={() => navigate('/weatherstations')
                        }>
                        Back
                    </Button>
                </Grid>
            )}
            {ws === undefined && (
                <Grid item xs={6}>
                    <img src={stationImage} alt="weatherstation" width={"100%"}></img>
                </Grid>
            )}
            <Grid item xs={6}>
                <Box bgcolor={'#e7deaa'} textAlign={'center'} mb={5}>
                    <Typography variant="h5">
                        Station: {weatherstation.name} <br></br>
                    </Typography>
                    <Typography>
                        longitude: {weatherstation.longitude} <br></br>
                        latitude: {weatherstation.latitude} <br></br>
                        elevation: {weatherstation.elevation} <br></br>
                        country: {weatherstation.geolocation.country.name} <br></br>
                    </Typography>
                </Box>
                <Box
                    display={'flex'}
                    position={'absolute'}
                    right={'26%'}
                    bottom={'1vh'}
                    zIndex={1000}
                >
                    <Typography position={'absolute'} variant={'h3'} color={'red'} bottom={'0vh'} right={'4.5vw'}>
                        {weatherstation.storingen ? weatherstation.storingen.map(Storing => Storing.reason).join(', ') : 'No Errors'}
                    </Typography>
                    <img src={Malfunction} alt='malfunction' style={{
                        position: 'absolute',
                        bottom: '0vh',
                        right: '0vh',
                        width: "3.5vw",
                        height: "7vh"
                    }}>
                    </img>
                </Box>
                <Box bgcolor={'#e7deaa'} textAlign={'center'}>
                    <Typography variant="h5">
                        Records:
                    </Typography>

                    <DataGrid rows={weatherstation.weatherdatas} columns={columns}>

                    </DataGrid>

                </Box>
            </Grid>

        </Grid>
    ) : <Typography>Loading...</Typography>;
}