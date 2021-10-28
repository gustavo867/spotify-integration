import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled.TouchableOpacity`
  width: ${width * 0.8}px;
  height: ${moderateScale(58)}px;
  background-color: rgb(10, 132, 255);
  border-radius: ${moderateScale(8)}px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: ${moderateScale(15)}px;
`;

export const Text = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: #fff;
  font-weight: bold;
`;
