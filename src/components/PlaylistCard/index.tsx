import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SpotifyPlaylist } from "../../@types/spotify";
import { useUser } from "../../hooks/user/user";

import * as S from "./styles";

type Props = {
  item: SpotifyPlaylist;
};

const PlaylistCard: React.FC<Props> = (props) => {
  const { getSpecificPlaylistMutation } = useUser();
  const { navigate } = useNavigation();

  return (
    <S.Container
      activeOpacity={0.8}
      onPress={() => getSpecificPlaylistMutation.mutate(props.item.id)}
    >
      <S.RowTop>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigate(
              "FullImage" as never,
              {
                url:
                  props.item.images[0]?.url ??
                  "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
              } as never
            )
          }
        >
          <S.PlaylistImg
            source={{
              uri:
                props.item.images[0]?.url ??
                "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
            }}
          />
        </TouchableOpacity>
        <S.PlaylistName>{props.item.name}</S.PlaylistName>
      </S.RowTop>
      <S.PlaylistDesc>
        {props.item.description !== ""
          ? props.item.description
          : "Playlist sem descrição"}
      </S.PlaylistDesc>
      <S.PlaylistDesc>{props.item.tracks.total} músicas</S.PlaylistDesc>
    </S.Container>
  );
};

export { PlaylistCard };
