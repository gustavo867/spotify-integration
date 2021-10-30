import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

import * as S from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  buttonWidth?: number;
  buttonColor?: string;
  isLoading?: boolean;
  buttonHeight?: number;
  style?: StyleProp<ViewStyle>;
}

const width = Dimensions.get("screen").width;

const Button: React.FC<ButtonProps> = ({
  text,
  buttonWidth = width * 0.8,
  buttonHeight = moderateScale(50),
  buttonColor = "rgb(10, 132, 255)",
  isLoading = false,
  style = {},
  ...rest
}) => {
  return (
    <S.Container
      activeOpacity={0.5}
      style={[
        {
          width: buttonWidth,
          height: buttonHeight,
          backgroundColor: buttonColor,
        },
        style,
      ]}
      {...rest}
    >
      {isLoading ? <ActivityIndicator color="#fff" /> : <S.Text>{text}</S.Text>}
    </S.Container>
  );
};

export { Button };
