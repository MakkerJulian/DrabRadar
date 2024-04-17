import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { Weatherstation } from "../types";
import { enqueueSnackbar } from "notistack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export const WeatherStations = () => {
    const [weatherstations, setWeatherstations] = useState<Weatherstation[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get<Weatherstation[]>('weatherstation')
            .then((response) => {
                setWeatherstations(response.data);
            })
            .catch(() => {
                enqueueSnackbar('Failed to fetch weatherstations', { variant: 'error' });
            });
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'name', flex: 1, headerName: 'Name',
        },
        {
            field: 'longitude', flex: 1, headerName: 'Longitude',
        },
        {
            field: 'latitude', flex: 1, headerName: 'Latitude',
        },
        {
            field: 'elevation', flex: 1, headerName: 'Elevation',
        },
        {
            field: 'geolocation.country', flex: 1, headerName: 'Country',
            valueGetter: (params) => {
                return params.row.geolocation.country.name;
            }
        },
        {
            field: 'geolocation.island', flex: 1, headerName: 'Island',
            valueGetter: (params) => {
                return params.row.geolocation.island;
            }
        },
        {
            field: 'geolocation.county', flex: 1, headerName: 'County',
            valueGetter: (params) => {
                return params.row.geolocation.county;
            }
        },
        {
            field: 'geolocation.place', flex: 1, headerName: 'Place',
            valueGetter: (params) => {
                return params.row.geolocation.place;
            }
        },
        {
            field: 'geolocation.hamlet', flex: 1, headerName: 'Hamlet',
            valueGetter: (params) => {
                return params.row.geolocation.hamlet;
            }
        },
        {
            field: 'geolocation.town', flex: 1, headerName: 'Town',
            valueGetter: (params) => {
                return params.row.geolocation.town;
            }
        },
        {
            field: 'geolocation.municipality', flex: 1, headerName: 'Municipality',
            valueGetter: (params) => {
                return params.row.geolocation.municipality;
            }
        },
        {
            field: 'geolocation.state_district', flex: 1, headerName: 'State District',
            valueGetter: (params) => {
                return params.row.geolocation.state_district;
            }
        },
        {
            field: 'geolocation.administrative', flex: 1, headerName: 'Administrative',
            valueGetter: (params) => {
                return params.row.geolocation.administrative;
            }
        },
        {
            field: 'geolocation.state', flex: 1, headerName: 'State',
            valueGetter: (params) => {
                return params.row.geolocation.state;
            }
        },
        {
            field: 'geolocation.village', flex: 1, headerName: 'Village',
            valueGetter: (params) => {
                return params.row.geolocation.village;
            }
        },
        {
            field: 'geolocation.region', flex: 1, headerName: 'Region',
            valueGetter: (params) => {
                return params.row.geolocation.region;
            }
        },
        {
            field: 'geolocation.province', flex: 1, headerName: 'Province',
            valueGetter: (params) => {
                return params.row.geolocation.province;
            }
        },
        {
            field: 'geolocation.city', flex: 1, headerName: 'City',
            valueGetter: (params) => {
                return params.row.geolocation.city;
            }
        },
        {
            field: 'geolocation.locality', flex: 1, headerName: 'Locality',
            valueGetter: (params) => {
                return params.row.geolocation.locality;
            }
        },
        {
            field: 'geolocation.postcode', flex: 1, headerName: 'Postcode',
            valueGetter: (params) => {
                return params.row.geolocation.postcode;
            }
        }, {
            field: 'actions', flex: 1, headerName: 'Actions',
            renderCell: (params) =>
                <>
                    <Tooltip title="View Weatherstation">
                        <IconButton onClick={() => navigate(`/weatherstation/${params.row.name}`)}>
                            <RemoveRedEyeIcon sx={{ color: 'blue' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Compare Weatherstation">
                        <IconButton onClick={() => navigate(`/weatherstation/compare/${params.row.name}`)}>
                            <CompareArrowsIcon sx={{ color: 'green' }} />
                        </IconButton>
                    </Tooltip>
                </>
        }
    ];

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="h1" justifyContent={"center"} display={"flex"}>
                Weather Stations
            </Typography>
            <Box height={'80vh'}> {/* Set the height to a percentage of the viewport height */}
                <DataGrid
                    initialState={
                        {
                            columns: {
                                columnVisibilityModel: {
                                    'geolocation.city': false,
                                    'geolocation.island': false,
                                    'geolocation.county': false,
                                    'geolocation.place': false,
                                    'geolocation.hamlet': false,
                                    'geolocation.town': false,
                                    'geolocation.municipality': false,
                                    'geolocation.state_district': false,
                                    'geolocation.administrative': false,
                                    'geolocation.state': false,
                                    'geolocation.village': false,
                                    'geolocation.region': false,
                                    'geolocation.province': false,
                                    'geolocation.locality': false,
                                    'geolocation.postcode': false,
                                }
                            }
                        }
                    }
                    columns={columns}
                    rows={weatherstations}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    getRowId={(row) => row.name}
                    sx={
                        { width: '80%', margin: 'auto' }
                    }
                />
            </Box>

            <Button
                sx={{ 
                    backgroundColor: 'green', 
                    color: 'white', 
                    width: '80%', 
                    margin: 'auto', 
                    mt: 2,
                    ":hover": {
                        backgroundColor: 'darkgreen',
                    }
                }}
                onClick={() => {
                    navigate('/')
                }}>
                Back
            </Button>
        </Box>
    )
}