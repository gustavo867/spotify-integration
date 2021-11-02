import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "../../@types/spotify";

import * as S from "./styles";
import { moderateScale } from "react-native-size-matters";
import { useUser } from "../../hooks/user/user";
import { useAudio } from "../../hooks/audio";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

type Props = {
  item: Item;
};

const MusicCard: React.FC<Props> = (props) => {
  const { audio } = useAudio();
  const { navigate } = useNavigation();
  const context = useUser();

  const artists = React.useMemo(() => {
    return props.item?.track?.artists?.map((art) => art.name).join(",");
  }, [props.item?.track?.artists]);

  const imgUrl = React.useMemo(
    () =>
      props.item?.track?.album?.images[0].url ??
      "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
    [props.item?.track?.album?.images]
  );

  const isPlaying = React.useMemo(
    () => context.currentMusicPlaying?.track?.id === props.item?.track?.id,
    [context.currentMusicPlaying?.track?.id, props.item?.track?.id]
  );

  return (
    <S.Container onPress={() => context.handlePlayPreview(props.item)}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigate(
            "FullImage" as never,
            {
              url: imgUrl,
            } as never
          )
        }
      >
        <S.ImgCircle
          source={{
            uri: imgUrl,
          }}
          resizeMode="cover"
          resizeMethod="resize"
        />
      </TouchableOpacity>

      <S.RightContainer>
        <S.Title
          style={{
            color: isPlaying ? "#57B660" : "#fff",
          }}
        >
          {props.item?.track?.name}
        </S.Title>
        <S.Artists>{artists}</S.Artists>
      </S.RightContainer>
      {props.item?.track?.preview_url ? (
        <S.PlayButton onPress={() => context.handlePlayPreview(props.item)}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={moderateScale(24)}
            color="#fff"
          />
        </S.PlayButton>
      ) : (
        <S.PlayButton>
          <View
            style={{
              width: moderateScale(24),
            }}
          />
        </S.PlayButton>
      )}
    </S.Container>
  );
};

export default MusicCard;
