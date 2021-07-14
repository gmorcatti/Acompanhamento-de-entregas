import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./mapStyles.scss";

function Map() {
  return (
    <div id="mapContainer">
      <MapContainer center={[-19.9317786,-43.9704423]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-19.9317786,-43.9704423]}>
          <Popup>
            O transportador está aqui
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
