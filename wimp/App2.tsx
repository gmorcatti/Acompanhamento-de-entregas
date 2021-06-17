import React from "react";
import { Text, TouchableOpacity, Button } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import axios from "axios";

const LOCATION_TASK_NAME = "background-location-task";

export default class Component extends React.Component {
  onPress = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    console.log("PEGOU STATUS", status);
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 2000,
        foregroundService: {
          notificationTitle: "Pegando todas",
          notificationBody: "Esta fera!",
        },
      });
    }
  };

  onPress2 = async () => {
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("Sucesso!");
    } catch (error) {
      console.log("err", error);
    }
  };

  render() {
    return (
      <>
        <Button onPress={this.onPress} title="Inicia" color="#cceeff">
          <Text>Enable background location</Text>
        </Button>
        <Button onPress={this.onPress2} title="Finaliza" color="#ccee00">
          <Text>Enable background location</Text>
        </Button>
      </>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("Olá", locations);
    axios.post("https://webhook.site/8c98edce-c395-4560-8e7f-bebbda726f63", {
      ...locations,
    });
    // do something with the locations captured in the background
  }
});
