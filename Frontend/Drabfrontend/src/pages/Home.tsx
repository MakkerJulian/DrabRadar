import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/Map.css';

export const Home = () => {
    return (
        <MapContainer center={[53.153180193809376, 6.992662913697204]} zoom={3} style={{"height": "960px"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[53.153180193809376, 6.992662913697204]}>
                <Popup>
                    Kars Doxx
                </Popup>
            </Marker>
        </MapContainer>
    );
}
