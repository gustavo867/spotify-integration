import React from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
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
import { Ionicons } from "@expo/vector-icons";

import * as S from "./styles";

const { width } = Dimensions.get("screen");

type FilterTypes = "1" | "2" | "3";

const Home: React.FC = () => {
  const { userData, tokens } = useAuth();
  const { playlists, getUserPlaylistsQuery, currentMusicPlaying } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [currentFilter, setCurrentFilter] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    getUserPlaylistsQuery.refetch();
  }, [tokens]);

  React.useEffect(() => {
    if (search === "") {
      setIsSearching(false);
    }
  }, [search]);

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
          <S.ModalContainer
            tint="dark"
            intensity={Platform.OS === "ios" ? 75 : 100}
          >
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
            inputWidth={width * 0.8}
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
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
            paddingBottom: currentMusicPlaying
              ? moderateScale(100)
              : moderateScale(20),
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaylistCard item={item} />}
        />
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export { Home };
