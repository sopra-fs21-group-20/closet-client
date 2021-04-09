import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import UserDisplay from "./UserDisplay";
import FeedActions from "./FeedActions";

function Card({ username, caption, likes, comments, imageUrl, onPress, thumbnailUrl, index }) {
  console.log(index);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, (index%2 === 0 ? null : lightTheme.card)]}>
        <Image
          style={styles.image}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <View style={styles.detailsContainer}>
          <UserDisplay
              username={username}
              caption={caption}
              profileImage={require("../assets/mockProfileImage.jpg")}
              lightTheme={index%2 !== 0}
          />
          <FeedActions likes={likes}
                       comments={comments}
                       lightTheme={index%2 !== 0}/>
        </View>
        <View style={[styles.afterCard, (index%2 === 0 ? null : lightTheme.afterCard)]} />
      </View>
    </TouchableWithoutFeedback>
  );
}

/*const headerHeight = ;
const tabBarHeight = useBottomTabBarHeight();*/

const styles = StyleSheet.create({
  afterCard: {
    height: 90,
    bottom:-90,
    left: 0,
    right: 0,
    position:"absolute",
    backgroundColor: colors.dark
  },
  card: {
    borderBottomColor: colors.dark,
    borderBottomWidth: 20,
    borderRadius: 0,
    borderTopLeftRadius: 50,
    backgroundColor: colors.dark,
    marginTop: 20,
    padding: 20,
    paddingBottom: 0,
    shadowColor: colors.black,
    shadowOffset: {
      height: -5
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  detailsContainer: {
    paddingVertical: 20,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: colors.black,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  subTitle: {
    color: colors.light,
    fontWeight: "bold",
  },
  title: {
    color: colors.white,
    marginBottom: 7,
    fontSize: 24
  },
});


const lightTheme = StyleSheet.create({
  afterCard: {
    backgroundColor: colors.white
  },
  card: {
    backgroundColor: colors.white,
  },
  subTitle: {
    color: colors.dark,
  },
  title: {
    color: colors.dark,
  },
});

export default Card;
