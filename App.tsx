import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/hooks/auth";
import { Routes } from "./src/routes/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </>
  );
}
