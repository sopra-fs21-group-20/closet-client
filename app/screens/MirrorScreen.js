import React, { useState } from "react";
import {StyleSheet, Text} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";

export default function MirrorScreen() {

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
