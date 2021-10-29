import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useMutation, useQuery } from "react-query";
import {
  Item,
  SpotifyPlaylist,
  SpotifyUserPlayLists,
} from "../../@types/spotify";
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
  const { navigate } = useNavigation();

  const getUserPlaylistsQuery = useQuery(
    "getUserPlaylistsQuery",
    () =>
      getUserPlaylists({
        user_id: context!.userData!.id!,
        token: context.tokens.accessToken,
      }),
    {
      keepPreviousData: true,
      cacheTime: 24 * 80,
      enabled: Boolean(
        context.userData?.id && context.tokens.accessToken !== ""
      ),
      onSuccess: (data) => {
        setPlaylists(data.items);
      },
      onError: (error) => {
        // console.log("deu erro", error.request);
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
    }),
    [
      getUserPlaylistsQuery,
      playlists,
      getSpecificPlaylistMutation,
      currentPlaylist,
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
