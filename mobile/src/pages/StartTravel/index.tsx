import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

import backgroundLocationTask from "../../tasks/backgroundLocation";

import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

import { Button } from "../../components/Button";

import ConfirmModal from "./components/ConfirmModal";
import MapContainer from "./components/MapContainer";
import TileTravelInfo from "./components/TileTravelInfo";

export default function StartTravel() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hasTravelStarted, setHasTravelStarted] = useState<boolean>(false);

  function startTravel() {
    setModalVisible(true);
  }

  function confirmStartTravel() {
    backgroundLocationTask
      .register()
      .then(() => setHasTravelStarted(true))
      .catch((err) => console.log("Erro: ", err.message));
  }

  function stopTravel() {
    backgroundLocationTask
      .unregister()
      .then(() => setHasTravelStarted(false))
      .catch((err) => console.log("Erro: ", err.message));
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
            Olá, Gabriel!
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
