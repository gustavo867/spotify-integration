import React, { createContext } from "react";
import { encode } from "base-64";
import { CLIENT_ID, CLIENT_SECRET } from "../../config";

import * as AuthSessions from "expo-auth-session";
import axios from "axios";
import { SpotifyDTOS } from "../@types/spotify";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthResponse = {
  authentication?: any;
  errorCode?: any;
  params: {
    code: string;
  };
  type: string;
  url: string;
};

type AuthContextProps = ReturnType<typeof useAuthProviderValues>;

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

function useAuthProviderValues() {
  const [loading, setLoading] = React.useState(false);
  const [tokens, setTokens] = React.useState({
    refreshToken: "",
    accessToken: "",
    expiresIn: "",
  });
  const [userData, setUserData] = React.useState<SpotifyDTOS | undefined>(
    undefined
  );

  async function handleLoginWithSpotify() {
    setLoading(true);

    try {
      const scope = "user-read-private playlist-modify-public";
      const redirect_uri =
        "https://auth.expo.io/@gustavo867/test-mobile-seven-app";

      const authUrl = `https://accounts.spotify.com/authorize?response_type=code&scope=${encodeURI(
        scope
      )}&client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}`;

      const authResponse = (await AuthSessions.startAsync({
        authUrl: authUrl,
      })) as AuthResponse;

      if (authResponse.type === "success") {
        const credsB64 = encode(`${CLIENT_ID}:${CLIENT_SECRET}`);

        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          `grant_type=authorization_code&code=${authResponse.params.code}&redirect_uri=${redirect_uri}`,
          {
            headers: {
              Authorization: `Basic ${credsB64}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
        } = response.data;

        const res = await axios.get<SpotifyDTOS>(
          "https://api.spotify.com/v1/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setTokens({
          accessToken,
          refreshToken,
          expiresIn,
        });

        setUserData(res.data);
        await AsyncStorage.setItem("@user", JSON.stringify(res.data));
        await AsyncStorage.setItem(
          "@tokens",
          JSON.stringify({
            accessToken,
            refreshToken,
            expiresIn,
          })
        );

        setLoading(false);

        return;
      }

      setLoading(false);

      Alert.alert("Erro ao fazer login com spotify");
    } catch (error: any) {
      console.log("error", error.request);

      setLoading(false);
    }
  }

  async function handleLogOutUser() {
    setUserData(undefined);
    setTokens({
      refreshToken: "",
      accessToken: "",
      expiresIn: "",
    });
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@tokens");
  }

  React.useEffect(() => {
    async function getUserFromStorage() {
      const user = await AsyncStorage.getItem("@user");
      const token = await AsyncStorage.getItem("@tokens");
      const userParsed = JSON.parse(user as string);
      const tokenParsed = JSON.parse(token as string);

      if (userParsed) {
        setUserData(userParsed);
        setTokens((s) => ({
          ...s,
          accessToken: tokenParsed?.access_token ?? s.accessToken,
          refreshToken: tokenParsed?.refreshToken ?? s.accessToken,
          expiresIn: tokenParsed?.expiresIn ?? s.accessToken,
        }));
      }
    }

    getUserFromStorage();
  }, []);

  return React.useMemo(
    () => ({
      loading,
      setLoading,
      userData,
      setUserData,
      handleLoginWithSpotify,
      tokens,
      handleLogOutUser,
    }),
    [
      loading,
      setLoading,
      userData,
      setUserData,
      handleLoginWithSpotify,
      tokens,
      handleLogOutUser,
    ]
  );
}

export const AuthProvider: React.FC = ({ children }) => {
  const values = useAuthProviderValues();

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = React.useContext(AuthContext);

  return context;
}
