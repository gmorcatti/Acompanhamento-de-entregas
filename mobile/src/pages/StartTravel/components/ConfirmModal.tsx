import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import colors from "../../../styles/colors";

type Props = {
  modalVisible: boolean;
  setModalVisible: Function;
  confirmButton: Function;
};

export default function ConfirmModal({
  modalVisible,
  setModalVisible,
  confirmButton,
}: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Você confirma o início da viagem?
          </Text>
          <View style={styles.buttonsGroup}>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={() => {
                confirmButton();
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonsGroup: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginHorizontal: 3,
  },
  buttonConfirm: {
    backgroundColor: colors.orange,
  },
  buttonCancel: {
    backgroundColor: colors.darkGrey,
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
