import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function OutfitButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="tshirt-crew"
          color={colors.white}
          size={32}
          style={{top:2}}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderColor: colors.darker,
    borderRadius: 40,
    borderWidth: 10,
    bottom: 20,
    height: 80,
    width: 80,
  },
});

export default OutfitButton;
