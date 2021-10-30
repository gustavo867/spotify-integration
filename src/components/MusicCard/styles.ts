import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: ${width * 0.95}px;
  border-color: rgba(255, 255, 255, 0.4);
  border-width: ${moderateScale(1)}px;
  align-self: center;
  margin-top: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(10)}px;
  align-items: center;
  flex-direction: row;
`;

export const RightContainer = styled.View`
  margin-left: ${moderateScale(15)}px;
  width: ${width * 0.85 - moderateScale(90)}px;
`;

export const ImgCircle = styled.Image`
  border-color: rgba(255, 255, 255, 0.4);
  border-width: 1px;
  width: ${moderateScale(50)}px;
  height: ${moderateScale(50)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #fff;
  font-size: ${moderateScale(13.5)}px;
  font-weight: 400;
  max-width: ${width * 0.75 - moderateScale(80)}px;
`;

export const Artists = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #fff;
  font-size: ${moderateScale(12)}px;
  font-weight: bold;
  margin-top: ${moderateScale(5)}px;
  max-width: ${width * 0.75 - moderateScale(80)}px;
`;

export const PlayButton = styled.TouchableOpacity``;
