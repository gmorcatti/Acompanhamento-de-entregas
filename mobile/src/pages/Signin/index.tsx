import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputIcon from "./components/inputIcon";
import { showToast } from "../../components/toast";

import axios from "axios";
import { Feather, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import fonts from "../../styles/fonts";
import { Button } from "./components/Button";
import colors from "../../styles/colors";
import storage from "../../storage";
import Loading from "../../components/Loading";

export default function Signin() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  async function handleLogin() {
    try {
      // const token = await authenticate();
      // const bearerToken = `Bearer ${token}`;

      // await storage.storeData("token", bearerToken);

      navigation.navigate("Packages");
    } catch (e) {
      const errorMessage = e.response.data.error;
      showToast(`Erro ao realizar login:\n${errorMessage}`);
    }
  }

  async function authenticate() {
    try {
      const userInfo = { email, password };

      const auth = await axios.post(
        "https://wimp-morcatti.herokuapp.com/auth/authenticate",
        userInfo
      );

      const token = auth.data.token;
      return token;
    } catch (e) {
      throw e;
    }
  }

  return (
    <>
      {/* <Loading /> */}
      <SafeAreaView style={[styles.container, styles.externalContainer]}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>
              Por favor, realize o login{"\n"}para prosseguir.
            </Text>
          </View>
          <View style={styles.inputs}>
            <InputIcon
              onChangeText={setEmail}
              value={email}
              placeholder="E-mail"
              keyboardType="email-address"
            >
              <Fontisto name="email" size={25} color={"#123456"} />
            </InputIcon>
            <InputIcon
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry
            >
              <Feather name="lock" size={25} color={"#123456"} />
            </InputIcon>
          </View>
          <View style={styles.button}>
            <Button
              text="Login"
              onPress={handleLogin}
              color={colors.darkOrange}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.forgotPassword}>
          <Text style={styles.simpleText}>Esqueceu sua senha? </Text>
          <Text style={styles.linkForgotPassword}>Clique Aqui</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  externalContainer: {
    marginHorizontal: 30,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  header: {
    alignItems: "flex-start",
    paddingVertical: 15,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 40,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 20,
  },
  inputs: {
    alignItems: "flex-start",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    alignItems: "flex-end",
  },
  forgotPassword: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  simpleText: {
    fontFamily: fonts.text,
    fontSize: 16,
  },
  linkForgotPassword: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.darkOrange,
  },
});
