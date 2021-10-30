import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContextProvider } from "../hooks/user/user";

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import MiniPlayer from "../components/MiniPlayer";
import { AudioProvider } from "../hooks/audio";

const UserStack = createNativeStackNavigator();

export function UserRoutes() {
  return (
    <AudioProvider>
      <UserContextProvider>
        <UserStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <UserStack.Screen name="Home" component={Home} />
          <UserStack.Screen name="Details" component={Details} />
        </UserStack.Navigator>
        <MiniPlayer />
      </UserContextProvider>
    </AudioProvider>
  );
}
