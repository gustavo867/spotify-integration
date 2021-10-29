import React from "react";
import { Ionicons } from "@expo/vector-icons";

import * as S from "./styles";
import { moderateScale } from "react-native-size-matters";
import { useAuth } from "../../hooks/auth";
import { TouchableOpacity } from "react-native";

type Props = {
  uri?: string | undefined;
  displayName?: string;
};

const UserInfo: React.FC<Props> = (props) => {
  const context = useAuth();

  return (
    <S.Container>
      <S.UserAvatar source={{ uri: props?.uri ?? "" }} />
      <S.UserDisplayName>
        <S.UserDisplayName
          style={{
            fontWeight: "400",
          }}
        >
          Olá
        </S.UserDisplayName>{" "}
        {props?.displayName ?? ""}
      </S.UserDisplayName>
      <TouchableOpacity onPress={() => context.handleLogOutUser()}>
        <Ionicons name="power" size={moderateScale(24)} color="#fff" />
      </TouchableOpacity>
    </S.Container>
  );
};

export { UserInfo };
