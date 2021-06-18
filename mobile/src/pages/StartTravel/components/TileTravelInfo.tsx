import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";

type Props = {
  hasTravelStarted: boolean;
};

export default function TileTravelInfo({ hasTravelStarted }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.title}>
          {hasTravelStarted ? "Viagem em Andamento" : "Aguardando..."}
        </Text>
        <Text style={styles.subtitle}>
          {hasTravelStarted
            ? `Iniciada em: 18/06/2021 às 11:13\nPor: Gabriel Morcatti`
            : `Inicie a viagem para iniciar o\nacompanhamento do processo.`}
        </Text>
      </View>
      <View>
        <View style={styles.iconBorder}>
          <View style={styles.icon}>
            <FontAwesome5 
                name={hasTravelStarted ? 'play' : 'stop'} 
                size={25} 
                color={colors.darkOrange}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    borderRadius: 25,
    backgroundColor: colors.purple,
  },
  description: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "70%",
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.lightGrey,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 14,
    fontWeight: "100",
    color: colors.lightGrey,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderColor: colors.darkOrange,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 200,
    backgroundColor: colors.lightGrey,
  },
  iconBorder: {
    alignItems: "center",
    justifyContent: "center",
    width: 79,
    height: 79,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.midGrey,
  },
});
