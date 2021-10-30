import { useRoute } from "@react-navigation/core";
import React from "react";
import { Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";

const { height, width } = Dimensions.get("screen");

type Props = {
  url: string;
};

const FullImage: React.FC = () => {
  const route = useRoute();
  const params = route.params as Props;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#13131A",
      }}
    >
      <Header />
      <Image
        style={{
          height: height * 0.8,
          width,
        }}
        source={{ uri: params.url }}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export { FullImage };
