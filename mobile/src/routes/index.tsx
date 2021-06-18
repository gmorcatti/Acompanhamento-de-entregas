import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../styles/colors";
import Signin from "../pages/Signin";
import StartTravel from "../pages/StartTravel";

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="StartTravel" component={StartTravel} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
