import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import axios from "axios";
import storage from "../storage";

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

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) return;

  if (data) {
    
    const token = await storage.getData('token');
    
    const { locations } = data;
    const latLng = {
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
    }

    axios({
      method: "put",
      url: "https://wimp-morcatti.herokuapp.com/transportador/location", 
      data: latLng,
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      }
    });
  }
});

export default {
  register,
  unregister,
  hasStartedLocationUpdates
}
