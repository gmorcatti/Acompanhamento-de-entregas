import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

import TabNavigator from "../../components/TabNavigator";
import { Button } from "../../components/Button";
import colors from "../../styles/colors";
import fonts from '../../styles/fonts';

export default function AddPackage() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Item com código: ${data} adicionado a lista.`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Cadastro de Nova Carga
        </Text>
        <Text style={styles.subtitle}>
          Escaneie o QR Code da carga com a câmera do celular para cadastra-la.
        </Text>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View>
        {scanned && (
            <Button
            text="Adicionar nova carga"
            color={colors.darkGrey}
            onPress={() => setScanned(false)}
            />
        )}
        <TabNavigator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: colors.lightGrey,
    marginHorizontal: 16,
  },
  qrCode: {
    height: 350,
    width: 350,
    marginBottom: 50,
  },
  header: {
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 40,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 16,
    textAlign: "center",
  },
});
