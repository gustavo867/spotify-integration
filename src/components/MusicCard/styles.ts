import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled.View`
  width: ${width * 0.8}px;
  border-color: rgba(255, 255, 255, 0.4);
  border-width: ${moderateScale(1)}px;
  align-self: center;
  margin-top: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(15)}px;
  flex-direction: row;
`;
