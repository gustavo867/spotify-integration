import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #13131a;
`;

export const SpotifyLogo = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: ${width}px;
  margin-top: ${moderateScale(35)}px;
  height: ${moderateScale(100)}px;
`;

export const Title = styled.Text`
  font-size: ${moderateScale(22)}px;
  font-weight: bold;
  color: #fff;
  width: ${width * 0.8}px;
  align-self: center;
  margin-top: ${moderateScale(35)}px;
`;

export const SubmitButtonContainer = styled.View`
  position: absolute;
  width: ${width}px;
  align-self: center;
  align-items: center;
`;
