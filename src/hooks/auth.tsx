import React, { createContext } from "react";
import { encode } from "base-64";
import { CLIENT_ID, CLIENT_SECRET } from "../../config";

import * as AuthSessions from "expo-auth-session";
import axios from "axios";

type AuthResponse = {
  authentication?: any;
  errorCode?: any;
  params: {
    code: string;
  };
  type: string;
  url: string;
};

type AuthContextProps = {
  handleLoginWithSpotify(): Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

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

        console.log("Oi", response.data);
      }

      console.log("a", authResponse);
    } catch (error) {
      console.log("error", error);

      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ handleLoginWithSpotify, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);

  return context;
}
