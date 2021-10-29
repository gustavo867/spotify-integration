import React from "react";
import { FlatList, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { PlaylistCard } from "../../components/PlaylistCard";
import { SearchInput } from "../../components/SearchInput";
import { UserInfo } from "../../components/UserInfo";
import { useAuth } from "../../hooks/auth";
import { useUser } from "../../hooks/user/user";

import * as S from "./styles";

const Home: React.FC = () => {
  const { userData } = useAuth();
  const { playlists, getUserPlaylistsQuery } = useUser();
  const [search, setSearch] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    getUserPlaylistsQuery.refetch();
  }, []);

  React.useEffect(() => {
    if (search === "") {
      setIsSearching(false);
    }
  }, [search]);

  return (
    <S.Container>
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
      <SearchInput
        value={search}
        onChangeText={setSearch}
        onFocus={() => setIsSearching(true)}
        onBlur={() => setIsSearching(false)}
      />
      <FlatList
        data={playlists.filter((pl) =>
          pl.name.toLowerCase().includes(search.toLowerCase())
        )}
        style={{
          marginTop: moderateScale(10),
        }}
        contentContainerStyle={{
          paddingTop: moderateScale(10),
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaylistCard item={item} />}
      />
    </S.Container>
  );
};

export { Home };
