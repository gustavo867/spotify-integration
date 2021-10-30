import React from "react";
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SpotifyPlaylist } from "../../@types/spotify";
import { useUser } from "../../hooks/user/user";
import { Badge } from "./Badge";

import * as S from "./styles";

type Props = {
  item: SpotifyPlaylist;
};

const PlaylistCard: React.FC<Props> = (props) => {
  const { getSpecificPlaylistMutation } = useUser();

  return (
    <S.Container
      activeOpacity={0.8}
      onPress={() => getSpecificPlaylistMutation.mutate(props.item.id)}
    >
      <Badge type={props.item.public ? "public" : "private"} />
      <S.RowTop>
        <S.PlaylistImg source={{ uri: props.item.images[0]?.url }} />
        <S.PlaylistName>{props.item.name}</S.PlaylistName>
      </S.RowTop>
      <S.PlaylistDesc>
        {props.item.description !== ""
          ? props.item.description
          : "Playlist sem descrição"}
      </S.PlaylistDesc>
      <S.PlaylistDesc>
        Total de músicas: {props.item.tracks.total}
      </S.PlaylistDesc>
    </S.Container>
  );
};

export { PlaylistCard };
