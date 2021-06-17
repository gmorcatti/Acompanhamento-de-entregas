import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import backgroundLocationTask from './src/tasks/backgroundLocation';

import axios from "axios";

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export default function App() {
  const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  }

  const [region, setRegion] = useState<Region>(initialRegion);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [startMap, setStartMap] = useState<boolean>(false);

  useEffect(() => {
    axios.get("https://webhook.site/8c98edce-c395-4560-8e7f-bebbda726f63");
    // getCoordinateIfPermitted()

    // const locationOptions = {
    //   accuracy: Location.Accuracy.Balanced,
    //   timeInterval: 10000,
    //   distanceInterval: 0
    // }
    // Location.watchPositionAsync(locationOptions, (location) => {
    //   console.log('PEGOU!', location)
    // })
  }, []);

  function toogleMap() {
    console.log('entrou')
    if(!startMap) {
      console.log('entrou', startMap)
      setStartMap(true);
      getCoordinateIfPermitted()
    } else {
      setStartMap(false);
    }
  }

  async function getCoordinateIfPermitted() {
    
    const { status } = await Location.requestBackgroundPermissionsAsync();
      
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    
    const location = await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude || 0;
    const longitude = location.coords.longitude || 0;

    setRegion({
      ...region,
      latitude,
      longitude,
    });

    return { latitude, longitude }
  }

  function startTravel() {
    backgroundLocationTask.register()
      .then(() => console.log("Registrou"))
      .catch((err) => console.log("Erro", err));
    Alert.alert("Viagem Iniciada!");
  }

  function stopTravel() {
    backgroundLocationTask.unregister()
      .then(() => console.log("DESRegistrou"))
      .catch((err) => console.log("erro", err));
    Alert.alert("Viagem Finalizada!");
  }

  async function isTravelStarted() {
    const isIniciado = await backgroundLocationTask.hasStartedLocationUpdates();
    Alert.alert(`A viagem foi iniciada? \n${isIniciado ? 'Sim' : 'Não'}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {errorMsg || !startMap ? (
            <Text>{errorMsg}</Text>
          ) : (
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              region={region}
            >
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
              />
            </MapView>
          )}
        </View>
      </View>
      <View>
        <Button
          onPress={() => toogleMap()}
          title="Pegar localização"
          color="#504ecc"
        />
        <Button
          onPress={() => isTravelStarted()}
          title="Viagem foi iniciada?"
          color="#3deca3"
        />
        <Button
          onPress={() => startTravel()}
          title="Iniciar Viagem "
        />
        <Button
          onPress={() => stopTravel()}
          title="Finalizar Viagem"
          color="#cc5dcc"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  mapContainer: {
    height: '80%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: "center",
    marginHorizontal: 16,
    overflow: "hidden"
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
