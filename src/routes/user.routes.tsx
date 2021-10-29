import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContextProvider } from "../hooks/user/user";

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";

const UserStack = createNativeStackNavigator();

export function UserRoutes() {
  return (
    <UserContextProvider>
      <UserStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <UserStack.Screen name="Home" component={Home} />
        <UserStack.Screen name="Details" component={Details} />
      </UserStack.Navigator>
    </UserContextProvider>
  );
}
