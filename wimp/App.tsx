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

import MyTask from "./myTask";

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};


export default function App() {
  const [region, setRegion] = useState<Region>({} as Region);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude || 0;
      const longitude = location.coords.longitude || 0;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01,
      });
      setLatitude(latitude);
      setLongitude(longitude);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {errorMsg ? (
            <Text>{errorMsg}</Text>
          ) : (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude || 0,
                longitude: longitude || 0,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
              }}
              region={region}
            >
              <Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                // image={{ uri: "custom_pin" }}
              />
            </MapView>
          )}
        </View>
      </View>
      <View>
        <Button
          onPress={async () => {
            const isIniciado = await MyTask.hasStartedLocationUpdates();
            Alert.alert("Iniciou? " + isIniciado);
          }}
          title="Pegar ao vivo aqui"
          color="#ddfcef"
        >
          Iniciar Viagem
        </Button>
        <Button
          onPress={() => {
            MyTask.register()
              .then(() => console.log("Registrou"))
              .catch((err) => console.log("erro", err));
            Alert.alert("Iniciou!");
          }}
          title="Iniciar Viagem "
        >
          Iniciar Viagem
        </Button>
        <Button
          onPress={() => {
            MyTask.unregister()
              .then(() => console.log("DESRegistrou"))
              .catch((err) => console.log("erro", err));
            Alert.alert("Finalizou!");
          }}
          title="Finalizar Viagem"
          color="#cc5dcc"
        >
          Finalizar Viagem
        </Button>
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
  teste: {
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
    // padding: 10,
    justifyContent: "center",
  },
});
