import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #13131a;
  padding-top: ${moderateScale(10)}px;
  align-items: center;
  justify-content: center;
`;

export const FiltersContainer = styled.View`
  width: ${width}px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const ModalContainer = styled(BlurView)`
  position: absolute;
  width: ${width * 0.9}px;
  min-height: ${height * 0.5}px;
  z-index: 1000;
  padding: ${moderateScale(20)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
