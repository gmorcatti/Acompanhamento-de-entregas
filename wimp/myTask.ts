import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import axios from "axios";

const LOCATION_TASK_NAME = "background-location-task";

const register = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 10000,
    distanceInterval: 0,
    foregroundService: {
      notificationTitle: "WIMP Ativado",
      notificationBody: "Viagem em andamento.",
    },
  });
};

const unregister = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
};

const hasStartedLocationUpdates = async () => {
  return await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
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

export default {
  register,
  unregister,
  hasStartedLocationUpdates
}
