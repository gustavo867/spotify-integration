import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "../../@types/spotify";

import * as S from "./styles";
import { moderateScale } from "react-native-size-matters";
import { useUser } from "../../hooks/user/user";
import { useAudio } from "../../hooks/audio";

type Props = {
  item: Item;
};

const MusicCard: React.FC<Props> = (props) => {
  const { audio } = useAudio();
  const context = useUser();

  const artists = React.useMemo(() => {
    return props.item?.track?.artists?.map((art) => art.name).join(",");
  }, [props.item?.track?.artists]);

  return (
    <S.Container>
      <S.ImgCircle
        source={{
          uri: props.item?.track?.album?.images[0].url ?? "",
        }}
        resizeMode="cover"
        resizeMethod="resize"
      />
      <S.RightContainer>
        <S.Title>{props.item?.track?.name}</S.Title>
        <S.Artists>{artists}</S.Artists>
      </S.RightContainer>
      {audio.isPlaying === false ? (
        <S.PlayButton onPress={() => context.handlePlayPreview(props.item)}>
          <Ionicons
            name={
              context.currentMusicPlaying?.track?.id === props.item?.track?.id
                ? "pause"
                : "play"
            }
            size={moderateScale(24)}
            color="#fff"
          />
        </S.PlayButton>
      ) : (
        context.currentMusicPlaying?.track?.id === props.item?.track?.id && (
          <S.PlayButton onPress={() => context.handlePlayPreview(props.item)}>
            <Ionicons
              name={
                context.currentMusicPlaying?.track?.id === props.item?.track?.id
                  ? "pause"
                  : "play"
              }
              size={moderateScale(24)}
              color="#fff"
            />
          </S.PlayButton>
        )
      )}
    </S.Container>
  );
};

export default MusicCard;
