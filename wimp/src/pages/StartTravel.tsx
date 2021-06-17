import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import backgroundLocationTask from "../tasks/backgroundLocation";

import fonts from "../styles/fonts";
import { Button } from '../components/Button';
import colors from "../styles/colors";


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

export default function StartTravel() {

  const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  };

  const [hasTravelStarted, setHasTravelStarted] = useState<boolean>(false);
  const [region, setRegion] = useState<Coordinates>(initialRegion);
  const [coordinates, setCoordinates] = useState<Coordinates>(initialRegion);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    const locationOptions = {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 10000,
      distanceInterval: 0,
    };

    Location.watchPositionAsync(locationOptions, (location) => {
      const newCoordinates = getNewCoordinates(location);
      setCoordinates({
        ...coordinates,
        latitude: newCoordinates.latitude,
        longitude: newCoordinates.longitude,
      });
    });
  }, []);

  function getNewCoordinates(location: Location) {
    const latitude = location.coords.latitude || 0;
    const longitude = location.coords.longitude || 0;

    return { latitude, longitude };
  }

  function startTravel() : void {
    backgroundLocationTask
      .register()
      .then(() => console.log("Registrou"))
      .catch((err) => console.log("Erro", err));

    setHasTravelStarted(true);
  }

  function stopTravel() {
    backgroundLocationTask
      .unregister()
      .then(() => console.log("DESRegistrou"))
      .catch((err) => console.log("erro", err));
    
    setHasTravelStarted(false);
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Olá, Gabriel!
        </Text>
        <Text style={styles.subtitle}>
          Quando estiver preparado, inicie a viagem.
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {errorMsg ? (
            <Text>{errorMsg}</Text>
          ) : (
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              region={region}
              onRegionChangeComplete={newRegion => setRegion(newRegion)}
            >
              <Marker
                coordinate={coordinates}
              />
            </MapView>
          )}
        </View>
        <View style={styles.information}>
          <Text>Latitude: {coordinates.latitude}</Text>
          <Text> | </Text>
          <Text>Longitude: {coordinates.longitude}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        {hasTravelStarted ? (
          <Button
            onPress={stopTravel}
            text="Finalizar Viagem"
          />
        ) : (
          <Button 
            onPress={startTravel} 
            text="Iniciar Viagem "
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.grey,
    justifyContent: "space-around",
  },
  header: {
    height: '20%',
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 15,
  },
  container: {
    flexBasis: '70%',
    justifyContent: "center",
    paddingVertical: 20
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 16,
  },
  information: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  mapContainer: {
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#fff",
    justifyContent: "center",
    overflow: "hidden",
    marginHorizontal: 16,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    marginHorizontal: 16,
    marginTop: 20
  }
});
