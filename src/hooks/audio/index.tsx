import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Audio } from "expo-av";
import { Alert, unstable_batchedUpdates } from "react-native";
import { Item } from "../../@types/spotify";

interface Props {
  children: ReactNode;
}

type IAudioContext = ReturnType<typeof useAudioValuesProvider>;

export const AudioContext = createContext<IAudioContext>({} as IAudioContext);

function useAudioValuesProvider() {
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [time, setTime] = useState({
    position: 0,
    timeLeft: 0,
    durationTime: "",
    positionTime: "",
    remainTime: "",
  });
  const [audio, setAudio] = useState({
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
    isBuffering: true,
    currentPlaying: "",
  });

  let timeTimeout: NodeJS.Timer;

  const [currentMusicPlaying, setCurrentMusicPlaying] = React.useState<
    Item | undefined
  >(undefined);

  const soundObject = useRef(new Audio.Sound()).current;

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  async function getStatus() {
    const status: any = await soundObject.getStatusAsync();
    if (status.isLoaded) {
      const percentage =
        (status["positionMillis"] / status["durationMillis"]) * 1000;
      const remainingTime = status["durationMillis"] - status["positionMillis"];
      const remainminute = remainingTime / 1000 / 60;
      const remainsecond = (remainingTime / 1000) % 60;
      const positionminute = status["positionMillis"] / 1000 / 60;
      const positionsecond = (status["positionMillis"] / 1000) % 60;
      const durationminute = status["durationMillis"] / 1000 / 60;
      const durationsecond = (status["durationMillis"] / 1000) % 60;

      const remain =
        remainminute.toString().split(".")[0] +
        ":" +
        remainsecond.toString().split(".")[0];
      const position =
        positionminute.toString().split(".")[0] +
        ":" +
        positionsecond.toString().split(".")[0];
      const duration =
        durationminute.toString().split(".")[0] +
        ":" +
        durationsecond.toString().split(".")[0];

      if (remainingTime <= 39) {
        setTimeout(() => {
          unloadMusic();
        }, 200);
      }

      setTime({
        position: percentage,
        timeLeft: remainingTime,
        remainTime: remain,
        positionTime: position,
        durationTime: duration,
      });
    } else {
      clearTimeout(timeTimeout);
    }
  }

  const loadMusicPreview = React.useCallback(
    async (uri: string, id: string) => {
      if (audio.isPlaying) {
        soundObject.unloadAsync().then(async () => {
          setTime({
            position: 0,
            timeLeft: 0,
            durationTime: "",
            positionTime: "",
            remainTime: "",
          });

          await soundObject.loadAsync({
            uri: uri,
          });

          timeTimeout = setInterval(() => getStatus(), 1000);

          setAudio({
            isPlaying: true,
            playbackInstance: "something" as unknown as null,
            volume: audio.volume,
            isBuffering: audio.isBuffering,
            currentPlaying: id,
          });

          await soundObject.playAsync();

          setShowMiniPlayer(true);
        });
      } else {
        await soundObject.loadAsync({
          uri: uri,
        });

        timeTimeout = setInterval(() => getStatus(), 1000);

        setAudio({
          isPlaying: true,
          playbackInstance: "something" as unknown as null,
          volume: audio.volume,
          isBuffering: audio.isBuffering,
          currentPlaying: id,
        });

        await soundObject.playAsync();

        setShowMiniPlayer(true);
      }
    },
    [audio]
  );

  const unloadMusic = React.useCallback(async () => {
    await soundObject.unloadAsync();

    setTime({
      position: 0,
      timeLeft: 0,
      durationTime: "",
      positionTime: "",
      remainTime: "",
    });

    setAudio({
      isPlaying: false,
      playbackInstance: null,
      volume: 1.0,
      isBuffering: true,
      currentPlaying: "",
    });

    clearTimeout(timeTimeout);

    setShowMiniPlayer(false);
    setCurrentMusicPlaying(undefined);
  }, []);

  const handlePlayPause = React.useCallback(async () => {
    const { isPlaying } = audio;

    isPlaying ? await unloadMusic() : await soundObject.playAsync();

    setAudio((s) => ({
      ...s,
      isPlaying: !isPlaying,
      playbackInstance: audio.playbackInstance,
      volume: audio.volume,
      isBuffering: audio.isBuffering,
    }));

    setCurrentMusicPlaying(undefined);
  }, [audio, soundObject]);

  const values = useMemo(
    () => ({
      showMiniPlayer,
      time,
      loadMusicPreview,
      handlePlayPause,
      audio,
      unloadMusic,
      currentMusicPlaying,
      setCurrentMusicPlaying,
      setShowMiniPlayer,
    }),
    [
      showMiniPlayer,
      time,
      loadMusicPreview,
      handlePlayPause,
      audio,
      unloadMusic,
      currentMusicPlaying,
    ]
  );

  return values;
}

export function AudioProvider({ children }: Props) {
  const values = useAudioValuesProvider();

  return (
    <AudioContext.Provider value={values}>{children}</AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("Context is not provided");
  }

  return context;
}
