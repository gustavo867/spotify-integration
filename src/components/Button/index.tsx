import React from "react";
import { Dimensions, TouchableOpacityProps, View } from "react-native";

import * as S from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  buttonWidth?: number;
  buttonColor?: string;
}

const width = Dimensions.get("screen").width;

const Button: React.FC<ButtonProps> = ({
  text,
  buttonWidth = width * 0.8,
  buttonColor = "rgb(10, 132, 255)",
  ...rest
}) => {
  return (
    <S.Container
      activeOpacity={0.5}
      style={{
        width: buttonWidth,
        backgroundColor: buttonColor,
      }}
      {...rest}
    >
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export { Button };
