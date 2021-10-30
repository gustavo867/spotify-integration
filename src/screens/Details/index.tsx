import React from "react";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Header } from "../../components/Header";
import MusicCard from "../../components/MusicCard";
import { SearchInput } from "../../components/SearchInput";
import { useUser } from "../../hooks/user/user";

import * as S from "./styles";

const Details: React.FC = () => {
  const context = useUser();
  const [search, setSearch] = React.useState("");

  return (
    <S.Container>
      <Header />
      <SearchInput
        placeholder="Pesquise pelo nome da música"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={context.currentPlaylist?.filter((pl) =>
          pl.track?.name
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              search
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            )
        )}
        contentContainerStyle={{
          paddingBottom: context.currentMusicPlaying
            ? moderateScale(100)
            : moderateScale(20),
        }}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item) => String(item.track.id)}
        renderItem={({ item }) => <MusicCard item={item} />}
      />
    </S.Container>
  );
};

export { Details };
