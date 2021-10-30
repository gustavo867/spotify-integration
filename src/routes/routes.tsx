import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "../hooks/auth";
import { UserRoutes } from "./user.routes";
import { AuthRoutes } from "./auth.routes";
import { AudioProvider } from "../hooks/audio";

export function Routes() {
  const { userData } = useAuth();

  return (
    <NavigationContainer>
      {userData ? <UserRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
