import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import * as S from "./styles";
import { moderateScale } from "react-native-size-matters";

interface Props extends TextInputProps {}

const SearchInput: React.FC<Props> = ({ ...rest }) => {
  const inputRef = React.useRef<TextInput>(null);

  function clearInput() {
    inputRef?.current?.blur();
    inputRef?.current?.clear();

    if (rest?.onChangeText) {
      rest?.onChangeText("");
    }
  }

  return (
    <S.Container>
      <Ionicons name="search" size={moderateScale(18)} color="#bfbfc1" />
      <S.Input
        ref={inputRef}
        placeholder="Pesquise aqui"
        placeholderTextColor="#fff"
        {...rest}
      />
      <TouchableOpacity
        hitSlop={{
          left: moderateScale(10),
          top: moderateScale(10),
          bottom: moderateScale(10),
          right: moderateScale(10),
        }}
        onPress={() => clearInput()}
      >
        <Ionicons
          name="close-circle"
          size={moderateScale(18)}
          color="#bfbfc1"
        />
      </TouchableOpacity>
    </S.Container>
  );
};

export { SearchInput };
