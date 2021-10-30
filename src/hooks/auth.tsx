import React, { createContext } from "react";
import { encode } from "base-64";
import { CLIENT_ID, CLIENT_SECRET, USER } from "../../config";

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

type TokenResponse = {
  access_token: string;
  expires_in: number;
};

type AuthContextProps = ReturnType<typeof useAuthProviderValues>;

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const redirect_uri = `https://auth.expo.io/@${USER}/spotify-integration`;

function useAuthProviderValues() {
  const [loading, setLoading] = React.useState(false);
  const [tokens, setTokens] = React.useState({
    refreshToken: "",
    accessToken: "",
    expiresIn: 0,
  });
  const [userData, setUserData] = React.useState<SpotifyDTOS | undefined>(
    undefined
  );

  async function refreshToken() {
    const credsB64 = encode(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const response = await axios.post<TokenResponse>(
      "https://accounts.spotify.com/api/token",
      `grant_type=refresh_token&refresh_token=${tokens.refreshToken}&redirect_uri=${redirect_uri}`,
      {
        headers: {
          Authorization: `Basic ${credsB64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    setTokens((s) => ({
      ...s,
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
    }));
  }

  async function getUserFromStorage() {
    const user = await AsyncStorage.getItem("@user");
    const token = await AsyncStorage.getItem("@tokens");
    const userParsed = JSON.parse(user as string);
    const tokenParsed = JSON.parse(token as string);

    if (userParsed) {
      setTokens({
        accessToken: tokenParsed?.accessToken,
        refreshToken: tokenParsed?.refreshToken,
        expiresIn: tokenParsed?.expiresIn,
      });

      setUserData(userParsed);

      if (tokenParsed?.expiresIn === 0) {
        await refreshToken();
      }
    }
  }

  React.useEffect(() => {
    getUserFromStorage();
  }, []);

  async function handleLoginWithSpotify() {
    setLoading(true);

    try {
      const scope = "user-read-private playlist-modify-public";
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
            code: authResponse.params.code,
          })
        );

        setLoading(false);

        return;
      }

      setLoading(false);

      Alert.alert("Erro ao fazer login com spotify");
    } catch (error: any) {
      console.log("error", error.request);

      if (error?.request?.status === 403) {
        Alert.alert("Usuário não registrado na dashboard de desenvolvedor");

        return;
      }

      Alert.alert("Erro ao fazer login com spotify");

      setLoading(false);
    }
  }

  async function handleLogOutUser() {
    setUserData(undefined);
    setTokens({
      refreshToken: "",
      accessToken: "",
      expiresIn: 0,
    });
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@tokens");
  }

  return React.useMemo(
    () => ({
      loading,
      setLoading,
      userData,
      setUserData,
      handleLoginWithSpotify,
      tokens,
      handleLogOutUser,
      refreshToken,
    }),
    [
      loading,
      setLoading,
      userData,
      setUserData,
      handleLoginWithSpotify,
      tokens,
      handleLogOutUser,
      refreshToken,
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
