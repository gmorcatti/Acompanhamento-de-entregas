import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import TabNavigator from "../../components/TabNavigator";
import storage from "../../storage";

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seus Pacotes</Text>
      </View>
      <View style={styles.body}>
        {packages.length > 0 && (packages.map(pack => (
          <Text key={pack._id}>{JSON.stringify(pack)}</Text>
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
});
