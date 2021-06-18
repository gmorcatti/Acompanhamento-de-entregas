import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

type Coordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type Location = {
  timestamp: number;
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
};

export default function MapContainer() {
  const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  };

  const [region, setRegion] = useState<Coordinates>(initialRegion);
  const [coordinates, setCoordinates] = useState<Coordinates>(initialRegion);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      const permissionAllowed = await requestPermission();
      if (!permissionAllowed) return;

      getCurrentPositionAndSetRegion();
      startWatchingPosition();
    })();
  }, []);

  async function requestPermission() {
    // const { status } = await Location.requestForegroundPermissionsAsync();
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("O usuário não permitiu acesso à localização.");
      return false;
    }

    return true;
  }

  async function getCurrentPositionAndSetRegion() {
    const location = await Location.getCurrentPositionAsync({});
    const newCoordinates = getNewCoordinates(location, coordinates);
    setRegion(newCoordinates);
  }

  function startWatchingPosition() {
    const locationOptions = {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 10000,
      distanceInterval: 0,
    };

    Location.watchPositionAsync(locationOptions, (location) => {
      const newCoordinates = getNewCoordinates(location, coordinates);
      setCoordinates(newCoordinates);
    });
  }

  function getNewCoordinates(location: Location, coordinates: Coordinates) {
    const latitude = location.coords.latitude || 0;
    const longitude = location.coords.longitude || 0;

    return {
      ...coordinates,
      latitude,
      longitude,
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {errorMsg ? (
          <Text>{errorMsg}</Text>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            region={region}
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          >
            <Marker coordinate={coordinates} />
          </MapView>
        )}
      </View>
      <View style={styles.information}>
        <Text>
          Latitude: {coordinates.latitude} | Longitude: {coordinates.longitude}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
  },
  information: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#fff",
    justifyContent: "center",
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
