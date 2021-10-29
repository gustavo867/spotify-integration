import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

export const Container = styled.TouchableOpacity`
  width: ${width * 0.8}px;
  min-height: ${moderateScale(120)}px;
  align-self: center;
  border-color: rgba(255, 255, 255, 0.4);
  border-width: ${moderateScale(1)}px;
  flex-direction: column;
  margin-top: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(15)}px;
`;

export const RowTop = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(15)}px;
`;

export const PlaylistImg = styled.Image`
  height: ${moderateScale(70)}px;
  width: ${moderateScale(70)}px;
  border-radius: ${moderateScale(8)}px;
  margin-right: ${moderateScale(15)}px;

  background-color: #ccc;
`;

export const PlaylistName = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${moderateScale(18)}px;
  max-width: ${width * 0.5}px;
  color: #fff;
`;

export const PlaylistDesc = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: ${moderateScale(15)}px;
  max-width: ${width * 0.75}px;
  color: #fff;
`;
