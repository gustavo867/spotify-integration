import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Alert } from "react-native";
import { useMutation, useQuery } from "react-query";
import { Item, SpotifyPlaylist } from "../../@types/spotify";
import { useAudio } from "../audio";
import { useAuth } from "../auth";
import { getSpecificPlaylist, getUserPlaylists } from "./queries";

type IUserContext = ReturnType<typeof useUserValuesProvider>;

export const UserContext = React.createContext<IUserContext>(
  {} as IUserContext
);

function useUserValuesProvider() {
  const context = useAuth();
  const [playlists, setPlaylists] = React.useState<SpotifyPlaylist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = React.useState<Item[]>([]);
  const {
    loadMusicPreview,
    currentMusicPlaying,
    setCurrentMusicPlaying,
    audio,
    handlePlayPause,
  } = useAudio();
  const { navigate } = useNavigation();

  const handlePlayPreview = async (music: Item) => {
    if (!music.track.preview_url) {
      Alert.alert("Oops", "Essa música não tem preview");
      return;
    }

    if (
      currentMusicPlaying?.track?.id === music?.track?.id &&
      audio.isPlaying
    ) {
      handlePlayPause();
    } else {
      loadMusicPreview(music.track.preview_url, music.track.id);

      setCurrentMusicPlaying(music);
    }
  };

  const getUserPlaylistsQuery = useQuery(
    "getUserPlaylistsQuery",
    () =>
      getUserPlaylists({
        user_id: context!.userData!.id!,
        token: context.tokens.accessToken,
      }),
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 60 * 24,
      enabled: Boolean(
        context.userData?.id && context.tokens.accessToken !== ""
      ),
      onSuccess: (data) => {
        setPlaylists(data.items);
      },
      onError: (error: any) => {
        // console.log("deu erro", error.request);
        context.refreshToken();
      },
    }
  );

  const getSpecificPlaylistMutation = useMutation(
    "getSpecificPlaylistMutation",
    (id: string) =>
      getSpecificPlaylist({
        token: context.tokens.accessToken,
        playlist_id: id,
      }),
    {
      onSuccess: (data) => {
        setCurrentPlaylist(data.tracks.items);

        navigate("Details" as never);
      },
    }
  );

  return React.useMemo(
    () => ({
      getUserPlaylistsQuery,
      playlists,
      getSpecificPlaylistMutation,
      currentPlaylist,
      currentMusicPlaying,
      setCurrentMusicPlaying,
      handlePlayPreview,
    }),
    [
      getUserPlaylistsQuery,
      playlists,
      getSpecificPlaylistMutation,
      currentPlaylist,
      currentMusicPlaying,
      handlePlayPreview,
    ]
  );
}

export const UserContextProvider: React.FC = ({ children }) => {
  const values = useUserValuesProvider();

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = React.useContext(UserContext);

  return context;
}
