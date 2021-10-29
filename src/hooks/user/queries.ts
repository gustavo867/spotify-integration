import axios from "axios";
import {
  SpotifySpecificPlaylist,
  SpotifyUserPlayLists,
} from "../../@types/spotify";

export interface getUserPlaylistsRequest {
  user_id: string;
  token: string;
}

export interface GetSpecificPlaylistRequest {
  playlist_id: string;
  token: string;
}

export async function getUserPlaylists(props: getUserPlaylistsRequest) {
  const response = await axios.get<SpotifyUserPlayLists>(
    `https://api.spotify.com/v1/users/${props.user_id}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );

  return response.data;
}

export async function getSpecificPlaylist(props: GetSpecificPlaylistRequest) {
  const response = await axios.get<SpotifySpecificPlaylist>(
    `https://api.spotify.com/v1/playlists/${props.playlist_id}`,
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );

  return response.data;
}
