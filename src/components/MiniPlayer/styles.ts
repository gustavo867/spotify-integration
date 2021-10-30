import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled(BlurView)`
  width: ${width * 0.9}px;
  padding: ${moderateScale(10)}px;
  border-radius: ${moderateScale(12)}px;
  position: absolute;
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.View`
  margin-left: ${moderateScale(10)}px;
  width: ${width * 0.8 - moderateScale(80)}px;
`;

export const ImgCircle = styled.Image`
  border-color: rgba(255, 255, 255, 0.4);
  border-width: 1px;
  width: ${moderateScale(50)}px;
  height: ${moderateScale(50)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const TimeLeft = styled.Text`
  font-size: ${moderateScale(13)}px;
  font-weight: 500;
  color: #fff;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #fff;
  font-size: ${moderateScale(13.5)}px;
  font-weight: 400;
`;
