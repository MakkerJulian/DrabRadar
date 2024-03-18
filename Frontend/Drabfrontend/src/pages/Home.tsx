import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/Map.css';

export const Home = () => {
    type locations = {
        name: string,
        longitude: number,
        latitude: number,
    }
    const [locations, setLocations] = useState<locations[]>([]);

    useEffect(()=>{
        axiosInstance.get('/weatherstation')
            .then((res)=>{
                setLocations(res.data);
            })
            .catch((err)=>{console.log(err)});
    },[]);

    return (
        <div className="map-wrapper">
            <MapContainer center={[39.17349868578113, 40.38833747608593]} zoom={2.5} style={{"height": "960px"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                    <Marker key={index} position={[location.latitude, location.longitude]}>
                        <Popup>
                            {location.name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <div className="extra-div">
                hi
            </div>
        </div>
    );
    
}
