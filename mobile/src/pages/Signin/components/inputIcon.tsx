import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";

type Props = {
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps;
  children?: React.ReactNode;
  onChangeText: Function;
};

export default function InputIcon({
  value,
  placeholder,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  children,
  onChangeText,
}: Props) {
  const [seePassword, setSeePassword] = useState<boolean>(false);

  function changePasswordView() {
    setSeePassword(!seePassword);
  }

  return (
    <View style={styles.container}>
      {children && <View style={styles.icon}>{children}</View>}
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder={placeholder || ""}
        keyboardType={keyboardType || "default"}
        secureTextEntry={secureTextEntry && !seePassword}
        autoCapitalize="none"
      />
      {secureTextEntry && (
        <View style={styles.icon}>
          <Feather.Button
            name={seePassword ? "eye" : "eye-off"}
            size={25}
            color={colors.darkGrey}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={changePasswordView}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
  },
  icon: {
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.midGrey,
    color: colors.darkGrey,
    width: "80%",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 10,
    padding: 10,
    textAlign: "center",
    fontFamily: fonts.text,
    fontWeight: "100",
  },
});
