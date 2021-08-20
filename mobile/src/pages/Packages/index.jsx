import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableHighlight } from "react-native";
import TabNavigator from "../../components/TabNavigator";
import storage from "../../storage";

import { AntDesign } from '@expo/vector-icons';

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export default function Packages() {
  const [token, setToken] = useState("");
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    (async () => {
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const token = await storage.getData("token");
      setToken(token);
      
      const packages = await getTransportadorPackages(token);
      setPackages(packages);
    })();
  }, []);

  async function getTransportadorPackages(token) {
    const response = await axios({
      method: "get",
      url: `https://wimp-morcatti.herokuapp.com/package/transportador`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }

  async function deleteTransportadorPackage(id) {
    const response = await axios({
      method: "delete",
      url: `https://wimp-morcatti.herokuapp.com/package/transportador`,
      data: {
        id
      },
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suas Cargas</Text>
      </View>
      <View style={styles.body}>
        {packages.length > 0 && (packages.map(pack => (
          <View key={pack._id} style={styles.card}>
            <View>
              <Text>Nome: {pack.name}</Text>
              <Text>Destinatário: {pack.receiver.name}</Text>
            </View>
            <View>
              <TouchableHighlight onPress={() => deleteTransportadorPackage(pack._id)}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableHighlight>
            </View>
          </View>
        )))}
      </View>
      <TabNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-end",
    marginHorizontal: 16,
  },
  header: {
    marginTop: 30,
    alignItems: "flex-start",
    paddingVertical: 15,
  },
  body: {
    flex: 1,
    alignItems: "flex-start",
    paddingVertical: 15,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 40,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: colors.midGrey,
    borderRadius: 10
  }
});
