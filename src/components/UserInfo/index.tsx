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
      <S.UserAvatar
        source={{
          uri:
            props?.uri ??
            "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
        }}
      />
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
