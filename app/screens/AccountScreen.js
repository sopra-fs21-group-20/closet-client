import React, {useState} from "react";
import {StyleSheet, View, FlatList, Image, Dimensions, ScrollView} from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import Gallery from "../components/profile/Gallery";
import ProfileDetails from "../components/profile/ProfileDetails";

function AccountScreen({ navigation }) {

    const [pictures, setPictures] = useState(pictures)
  // const { user, logOut } = useAuth();
  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <ProfileDetails/>
        <Gallery/>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
});

export default AccountScreen;
