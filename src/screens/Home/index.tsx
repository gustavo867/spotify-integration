import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Button } from "../../components/Button";
import { PlaylistCard } from "../../components/PlaylistCard";
import { SearchInput } from "../../components/SearchInput";
import { UserInfo } from "../../components/UserInfo";
import { useAuth } from "../../hooks/auth";
import { useUser } from "../../hooks/user/user";

import * as S from "./styles";

const { width } = Dimensions.get("screen");

type FilterTypes = "1" | "2" | "3";

const Home: React.FC = () => {
  const { userData, tokens } = useAuth();
  const { playlists, getUserPlaylistsQuery } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [currentFilter, setCurrentFilter] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const { addListener, removeListener } = useNavigation();

  React.useEffect(() => {
    getUserPlaylistsQuery.refetch();
  }, [tokens]);

  React.useEffect(() => {
    if (search === "") {
      setIsSearching(false);
    }
  }, [search]);

  React.useEffect(() => {
    const listener = addListener("blur", () => {
      setIsModalOpen(false);
    });

    return () => removeListener("blur", () => {});
  }, []);

  function handleSetFilter(val: string) {
    setCurrentFilter(val);
    setIsModalOpen(false);
  }

  function handleFilters(id: FilterTypes) {
    if (id === "1") {
      return playlists.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (id === "2") {
      return playlists.sort((a, b) => b.tracks.total - a.tracks.total);
    }

    if (id === "3") {
      return playlists.sort((a, b) => a.tracks.total - b.tracks.total);
    }

    return playlists;
  }

  const playlistFiltered = React.useMemo(() => {
    return handleFilters(currentFilter as FilterTypes);
  }, [playlists, currentFilter]);

  return (
    <TouchableWithoutFeedback onPress={() => setIsModalOpen(false)}>
      <S.Container>
        {isModalOpen && (
          <S.ModalContainer tint="light" intensity={75}>
            <Button text="A-Z" onPress={() => handleSetFilter("1")} />
            <Button
              text="Total de músicas maior para menor"
              onPress={() => handleSetFilter("2")}
            />
            <Button
              text="Total de músicas menor para maior"
              onPress={() => handleSetFilter("3")}
            />
            <Button text="Remover filtro" onPress={() => handleSetFilter("")} />
          </S.ModalContainer>
        )}
        {!isSearching && (
          <>
            <UserInfo
              uri={userData?.images[0]?.url}
              displayName={userData?.display_name}
            />
            <View
              style={{
                height: moderateScale(20),
              }}
            />
          </>
        )}
        <S.FiltersContainer>
          <SearchInput
            inputWidth={width * 0.65}
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />
          <Button
            text="Filtros"
            style={{
              marginTop: 0,
            }}
            onPress={() => setIsModalOpen(true)}
            buttonHeight={moderateScale(42)}
            buttonWidth={width * 0.28}
          />
        </S.FiltersContainer>

        <FlatList
          data={playlistFiltered.filter((pl) =>
            pl.name.toLowerCase().includes(search.toLowerCase())
          )}
          style={{
            marginTop: moderateScale(10),
          }}
          contentContainerStyle={{
            paddingTop: moderateScale(10),
            paddingBottom: moderateScale(20),
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaylistCard item={item} />}
        />
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export { Home };
