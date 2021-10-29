import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import * as S from "./styles";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";

const Header: React.FC = () => {
  const { goBack } = useNavigation();

  const hitSlop = {
    left: moderateScale(10),
    top: moderateScale(10),
    bottom: moderateScale(10),
    right: moderateScale(10),
  };

  return (
    <S.Container>
      <TouchableOpacity onPress={() => goBack()} hitSlop={hitSlop}>
        <Ionicons name="chevron-back" size={moderateScale(24)} color="#fff" />
      </TouchableOpacity>
    </S.Container>
  );
};

export { Header };
