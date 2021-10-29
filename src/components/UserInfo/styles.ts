import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled.View`
  width: ${width * 0.8}px;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const UserDisplayName = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: #fff;
  font-weight: bold;
`;

export const UserAvatar = styled.Image`
  width: ${moderateScale(70)}px;
  height: ${moderateScale(70)}px;
  border-radius: ${moderateScale(70 / 2)}px;

  background-color: #ccc;
`;
