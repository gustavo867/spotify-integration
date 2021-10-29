import React from "react";
import { FlatList, Text } from "react-native";
import { Header } from "../../components/Header";
import { useUser } from "../../hooks/user/user";

import * as S from "./styles";

interface RouteProps {
  playlist_id: string;
}

const Details: React.FC = () => {
  const context = useUser();

  return (
    <S.Container>
      <Header />
      <FlatList
        data={context.currentPlaylist}
        keyExtractor={(item) => String(item.track.id)}
        renderItem={({ item }) => (
          <Text
            style={{
              color: "#fff",
            }}
          >
            {item.track.name}
          </Text>
        )}
      />
    </S.Container>
  );
};

export { Details };
