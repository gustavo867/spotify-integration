import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { useUser } from "../../hooks/user/user";

import * as S from "./styles";
import { useAudio } from "../../hooks/audio";
import { useNavigation } from "@react-navigation/core";

const MiniPlayer: React.FC = () => {
  const { showMiniPlayer, handlePlayPause, audio, time } = useAudio();
  const { currentMusicPlaying, setCurrentMusicPlaying } = useUser();
  const { navigate } = useNavigation();
  const safeArea = useSafeAreaInsets();

  return showMiniPlayer && currentMusicPlaying ? (
    <S.Container
      style={{
        bottom: safeArea.bottom + moderateScale(20),
      }}
      tint="dark"
      intensity={90}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigate(
            "FullImage" as never,
            {
              url:
                currentMusicPlaying.track?.album?.images[0].url ??
                "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
            } as never
          )
        }
      >
        <S.ImgCircle
          source={{
            uri:
              currentMusicPlaying.track?.album?.images[0].url ??
              "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
          }}
        />
      </TouchableOpacity>

      <S.Column>
        <S.Title>{currentMusicPlaying.track.name}</S.Title>
        {audio.isPlaying && (
          <S.TimeLeft>
            {isNaN(Number(time.positionTime.replace(":", ""))) === false
              ? time.positionTime + " de"
              : ""}{" "}
            {isNaN(Number(time.durationTime.replace(":", ""))) === false
              ? time.durationTime
              : ""}
          </S.TimeLeft>
        )}
      </S.Column>
      <TouchableOpacity onPress={() => handlePlayPause()}>
        <Ionicons
          name={audio.isPlaying ? "pause" : "play"}
          size={moderateScale(24)}
          color="#fff"
        />
      </TouchableOpacity>
    </S.Container>
  ) : null;
};

export default MiniPlayer;
