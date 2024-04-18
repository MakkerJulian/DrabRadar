import { Box, Button, Grid, Typography } from "@mui/material"
import { Weatherstation } from "../types";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { WeatherStation as stationImage } from "../assets";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'; //freezing
import WaterDropIcon from '@mui/icons-material/WaterDrop';//rain
import AcUnitIcon from '@mui/icons-material/AcUnit'; //snow
import SevereColdIcon from '@mui/icons-material/SevereCold'; //hail
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'; //thunder
import TornadoIcon from '@mui/icons-material/Tornado'; //Tornado

import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type Props = {
    ws?: Weatherstation;
}

export const WeatherStationDetail = ({ ws }: Props) => {

    const [weatherstation, setWeatherstation] = useState<Weatherstation>();
    const navigate = useNavigate();

    useEffect(() => {
        if (ws) return setWeatherstation(ws);
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


    const storingColumns = [
        {
            field: 'id', flex: 1, headerName: 'ID',
        },
        {
            field: 'timestamp', flex: 1, headerName: 'Date',
            renderCell: (params: { row: { timestamp: string | number | Date; }; }) => (
                <>
                    {new Date(params.row.timestamp).toLocaleString()}
                </>
            )
        },
        {
            field: 'reason', flex: 1, headerName: 'Description',
        }
    ]

    return weatherstation ? (
        <Grid container spacing={1}>
            {ws === undefined && (
                <Grid item xs={12}>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant="h1">Weather Station Detail</Typography>
                    </Box>
                </Grid>
            )}
            {ws === undefined && (
                <Grid item xs={6}>
                    <img src={stationImage} alt="weatherstation" width={"60%"} style={{ marginBottom: "2vh", marginLeft: '13vw' }}></img>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                    >
                        <Box display={'flex'}>
                            <WarningAmberIcon color="error" sx={{ fontSize: "8vh" }} />
                            <Typography variant="h2" color="error">Errors:</Typography>
                        </Box>


                        {weatherstation.storings.length === 0 ? (
                            <Typography color={"red"} fontSize={"5vh"}>
                                No errors
                            </Typography>
                        ) :
                            <DataGrid sx={{ width: "80%", mb: "2vh" }}
                                rows={weatherstation.storings}
                                columns={storingColumns}
                                pageSizeOptions={[5, 10, 50]}
                                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}>

                            </DataGrid>

                        }
                    </Box>

                </Grid>
            )}
            <Grid item xs={ws === undefined ? 6 : 12}>
                <Box bgcolor={'#e7deaa'} textAlign={'center'} mb={"3vh"}>
                    <Typography variant="h4">
                        Station: {weatherstation.name} <br></br>
                    </Typography>
                    <Typography variant="h5">
                        Longitude: {weatherstation.longitude} <br></br>
                        Latitude: {weatherstation.latitude} <br></br>
                        Elevation: {weatherstation.elevation} <br></br>
                        Country: {weatherstation.geolocation.country.name} <br></br>
                    </Typography>
                </Box>
                <Box bgcolor={'#e7deaa'} textAlign={'center'} mb={"5vh"}>
                    <Typography variant="h3">
                        Records:
                    </Typography>

                    {weatherstation.weatherdatas.length > 0 ? (
                        <Box height={"30vh"} width={"100%"}>
                            <DataGrid
                                rows={weatherstation.weatherdatas}
                                columns={columns}
                                pageSizeOptions={[5, 10, 50]}
                                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                            />
                        </Box>

                    ) : <Typography>No records found</Typography>}
                </Box>
                {ws === undefined && (
                    <>
                        <Button
                            sx={{
                                backgroundColor: '#004daa',
                                width: "60%",
                                height: "5vh",
                                color: 'white',
                                ":hover": {
                                    backgroundColor: 'darkblue',
                                },
                                left: "20%",
                                mb: "2vh"
                            }}
                            onClick={() => navigate(`/weatherstation/compare/${weatherstation.name}`)
                            }>
                            <Typography variant="h6">Compare this Weatherstation</Typography>
                        </Button>

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
                    </>
                )}

            </Grid>

        </Grid>
    ) : <Typography>Loading...</Typography>;
}