import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

import axios from "axios";

import backgroundLocationTask from "../../tasks/backgroundLocation";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

import { Button } from "../../components/Button";

import ConfirmModal from "./components/ConfirmModal";
import MapContainer from "./components/MapContainer";
import TileTravelInfo from "./components/TileTravelInfo";
import storage from "../../storage";

export default function StartTravel() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hasTravelStarted, setHasTravelStarted] = useState<boolean>(false);
  const [name, setName] = useState<string>('...');

  useEffect(() => {
    (async () => {
      const token = await storage.getData('token');
  
      const {data} = await axios({
        method: "get",
        url: "https://wimp-morcatti.herokuapp.com/transportador/name",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      });

      setName(data.name)
    })()
  }, [])

  function startTravel() {
    setModalVisible(true);
  }

  async function confirmStartTravel() {
    try {
      const token = await storage.getData('token');
      
      await axios({
        method: "put",
        url: "https://wimp-morcatti.herokuapp.com/transportador/travelStatus", 
        data: { isTraveling: true },
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      });
  
      backgroundLocationTask
        .register()
        .then(() => setHasTravelStarted(true))
    } catch (e) {
      console.log('ERRO TO START TRAVEL: ', e)
    }
  }

  async function stopTravel() {
    try {
      const token = await storage.getData('token');
      
      await axios({
        method: "put",
        url: "https://wimp-morcatti.herokuapp.com/transportador/travelStatus", 
        data: { isTraveling: false },
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      });
  
      backgroundLocationTask
        .unregister()
        .then(() => setHasTravelStarted(false))
    } catch (e) {
      console.log('ERRO TO FINISH TRAVEL: ', e)
    }
  }

  return (
    <>
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        confirmButton={confirmStartTravel}
      />
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Olá, {name}!
          </Text>
          <Text style={styles.subtitle}>
            Quando estiver preparado, inicie a viagem.
          </Text>
        </View>
        <View style={styles.mapContainer}>
          <MapContainer />
        </View>
        <View style={styles.tileTravelInfo}>
          <TileTravelInfo 
            hasTravelStarted={hasTravelStarted}
          />
        </View>
        {hasTravelStarted ? (
          <Button onPress={stopTravel} text="Finalizar Viagem" color={colors.red} />
        ) : (
          <Button onPress={startTravel} text="Iniciar Viagem " color={colors.green} />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.lightGrey,
    marginHorizontal: 16,
  },
  header: {
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 40,
  },
  mapContainer: {
    flex: 1,
    minHeight: 200,
    justifyContent: "center",
    paddingVertical: 20,
  },
  tileTravelInfo: {
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 16,
  },
});
