import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";

import { BarCodeScanner } from "expo-barcode-scanner";

import TabNavigator from "../../components/TabNavigator";
import { Button } from "../../components/Button";
import colors from "../../styles/colors";
import fonts from '../../styles/fonts';

import storage from '../../storage';

export default function AddPackage() {
  const [token, setToken] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [successScanned, setSuccessScanned] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const token = await storage.getData('token');
      setToken(token);
    })();
  }, []);

  async function setPackageTransportador(packageId) {
    const response = await axios({
      method: "put",
      url: `https://wimp-morcatti.herokuapp.com/package/transportador`,
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      data: {
        packageId: packageId
      }
    });
    
    return response.data;
  }

  async function verifyIfPackageExists(packageId) {
    const response = await axios({
      method: "get",
      url: `https://wimp-morcatti.herokuapp.com/package/${packageId}`,
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      }
    });
    
    return response.data;
  }

  const handleBarCodeScanned = async ({ data }) => {
    try {
      setScanned(true);
      
      const packageExists = await verifyIfPackageExists(data);

      await setPackageTransportador(data);
      
      if(packageExists) {
        setSuccessScanned(true);
        alert(`Item com código: ${data} adicionado a lista.`);
      } else {
        setSuccessScanned(false);
        alert(`Item com código: ${data} não encontrado no sistema.`);
      }
    } catch (err) {
      console.log(err)
      setSuccessScanned(false);
      alert(`Erro ao consultar existencia do pacote.`);
    }
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
            text={ successScanned ? "Adicionar nova carga" : 'Tentar novamente' }
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
