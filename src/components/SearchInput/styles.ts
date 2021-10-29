import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled.View`
  width: ${width * 0.9}px;
  height: ${moderateScale(45)}px;
  background-color: #131313;
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-horizontal: ${moderateScale(5)}px;
  border-radius: ${moderateScale(10)}px;
  border-color: rgba(255, 255, 255, 0.3);
  border-width: 1px;
`;

export const Input = styled.TextInput`
  width: ${width * 0.7}px;
  color: #fff;
  font-size: ${moderateScale(14)}px;
  padding-left: ${moderateScale(10)}px;
`;
