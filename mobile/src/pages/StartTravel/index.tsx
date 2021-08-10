import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";

import backgroundLocationTask from "../../tasks/backgroundLocation";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import storage from "../../storage";

import { Button } from "../../components/Button";
import { showToast } from "../../components/toast";

import ConfirmModal from "./components/ConfirmModal";
import MapContainer from "./components/MapContainer";
import TileTravelInfo from "./components/TileTravelInfo";
import TabNavigator from "../../components/TabNavigator";

export default function StartTravel() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hasTravelStarted, setHasTravelStarted] = useState<boolean>(false);
  const [name, setName] = useState<string>('...');
  const [modalType, setModalType] = useState<string>('start');

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

  function startOrStopTravel(type : string) {
    setModalType(type);
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
      const errorMessage = e.response.data.error;
      showToast(`Erro ao iniciar viagem:\n${errorMessage}`);
    }
  }

  async function confirmStopTravel() {
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
      const errorMessage = e.response.data.error;
      showToast(`Erro ao encerrar viagem:\n${errorMessage}`);
    }
  }

  return (
    <>
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        confirmButton={modalType == 'start' ? confirmStartTravel : confirmStopTravel}
        type={modalType}
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
            name={name}
          />
        </View>
        {hasTravelStarted ? (
          <Button onPress={() => startOrStopTravel('stop')} text="Finalizar Viagem" color={colors.red} />
        ) : (
          <Button onPress={() => startOrStopTravel('start')} text="Iniciar Viagem " color={colors.green} />
        )}
        <TabNavigator/>
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
