import React from "react";
import { StatusBar } from "expo-status-bar";
import { Login } from "./src/screens/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/hooks/auth";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </SafeAreaProvider>
    </>
  );
}
