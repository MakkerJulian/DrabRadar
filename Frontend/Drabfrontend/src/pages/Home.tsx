import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/Map.css';

export const Home = () => {
    return (
        <div className="map-wrapper">
            <MapContainer center={[39.17349868578113, 40.38833747608593]} zoom={2.5} style={{"height": "960px"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[53.153180193809376, 33.38833747608593]}>
                    <Popup>
                        Kars Doxx
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="extra-div">
                hi
            </div>
        </div>
    );
}
