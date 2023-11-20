import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function HeaderLeft() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Image
        source={require("./../assets/beto.jpeg")}
        style={{
          width: 40,
          height: 40,
          borderRadius: 100,
          marginLeft: 15,
        }}
      />
    </Pressable>
  );
}
