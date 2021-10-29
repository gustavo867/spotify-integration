import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled.View`
  width: ${width}px;
  padding-horizontal: ${moderateScale(15)}px;
  flex-direction: row;
  margin-bottom: ${moderateScale(10)}px;
`;
