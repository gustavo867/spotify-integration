import React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "../../components/Button";

import spotifyLogo from "../../assets/spotify_logo.png";

import * as S from "./styles";
import { CLIENT_ID } from "../../../config";
import { moderateScale } from "react-native-size-matters";
import { useAuth } from "../../hooks/auth";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const Login: React.FC = () => {
  const safeAreaInsents = useSafeAreaInsets();
  const { handleLoginWithSpotify } = useAuth();

  return (
    <S.Container>
      <S.SpotifyLogo source={spotifyLogo} />
      <S.Title>Faça login com o spotify para ver suas playlists</S.Title>
      <S.SubmitButtonContainer
        style={{
          bottom: safeAreaInsents.bottom + moderateScale(15),
        }}
      >
        <Button
          buttonColor="#1bd760"
          onPress={() => handleLoginWithSpotify()}
          text="Login com o spotify"
        />
      </S.SubmitButtonContainer>
    </S.Container>
  );
};

export { Login };
