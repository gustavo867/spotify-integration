import React from "react";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Header } from "../../components/Header";
import MusicCard from "../../components/MusicCard";
import { useUser } from "../../hooks/user/user";

import * as S from "./styles";

const Details: React.FC = () => {
  const context = useUser();

  return (
    <S.Container>
      <Header />
      <FlatList
        data={context.currentPlaylist}
        contentContainerStyle={{
          paddingBottom: moderateScale(20),
        }}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item) => String(item.track.id)}
        renderItem={({ item }) => <MusicCard item={item} />}
      />
    </S.Container>
  );
};

export { Details };
