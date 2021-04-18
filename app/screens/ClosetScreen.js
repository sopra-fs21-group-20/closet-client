import React, {useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useHeaderHeight} from '@react-navigation/stack';

import Screen from "../components/Screen";

export default function ClosetScreen() {
  return (
    <Screen style={styles.container}>
      <Text>Closet</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
