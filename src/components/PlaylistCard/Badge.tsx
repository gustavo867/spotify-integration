import React from "react";
import { View, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";

// import { Container } from './styles';

type Props = {
  type: "public" | "private";
};

const Badge: React.FC<Props> = (props) => {
  const colors = {
    public: "#004BA8",
    private: "#00377A",
  };

  const texts = {
    public: "Público",
    private: "Privado",
  };

  return (
    <View
      style={{
        position: "absolute",
        right: moderateScale(10),
        bottom: moderateScale(10),
        padding: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: colors[props.type],
      }}
    >
      <Text
        style={{
          color: "#fff",
        }}
      >
        {texts[props.type]}
      </Text>
    </View>
  );
};

export { Badge };
