import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/auth";
import { UserRoutes } from "./user.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { userData } = useAuth();

  return (
    <NavigationContainer>
      {userData ? <UserRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
