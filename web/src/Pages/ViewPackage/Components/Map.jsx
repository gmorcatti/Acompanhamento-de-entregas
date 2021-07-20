import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "./mapStyles.scss";

function Map({ latitude, longitude }) {
  const [center, setCenter] = useState([latitude, longitude]);

  useEffect(() => {
    setCenter([latitude, longitude]);
  }, [latitude, longitude]);

  function SetCenter({ center }) {
    const map = useMap();
    map.setView(center, 21);
    return null;
  }

  return (
    <div id="mapContainer">
      <MapContainer center={center} zoom={21} scrollWheelZoom={true}>
        <SetCenter center={center} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>O transportador está aqui</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
