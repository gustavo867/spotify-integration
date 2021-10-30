import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContextProvider } from "../hooks/user/user";

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import MiniPlayer from "../components/MiniPlayer";
import { AudioProvider } from "../hooks/audio";
import { FullImage } from "../screens/FullImage";

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
          <UserStack.Screen
            name="FullImage"
            component={FullImage}
            options={{
              presentation: "modal",
            }}
            initialParams={{
              url: "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
            }}
          />
        </UserStack.Navigator>
        <MiniPlayer />
      </UserContextProvider>
    </AudioProvider>
  );
}
