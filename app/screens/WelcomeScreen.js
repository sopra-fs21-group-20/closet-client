import React from "react";
import {ImageBackground, StyleSheet, View, Image, Text, Dimensions} from "react-native";

import Button from "../components/Button";
import routes from "../navigation/routes";
import { useFonts, Damion_400Regular } from '@expo-google-fonts/damion';
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";

function WelcomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Damion_400Regular,
  });

  if(!fontsLoaded) return (<ActivityIndicator visible={true}/>);

  return (
    <ImageBackground
        blurRadius={3}
      style={styles.background}
      source={require("../assets/triangle_background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-primary.png")} resizeMode={"contain"} />
        <Text style={styles.tagline}>myOutf.it</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="dark"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: "100%",
    height: 130,
  },
  logoContainer: {
    position: "absolute",
    top: 100,
    bottom: 100,
    height: Dimensions.get("window").height - 200,
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tagline: {
    fontSize: 50,
    padding: 20,
    fontFamily: "Damion_400Regular",
    color: colors.dark,
  },
});

export default WelcomeScreen;
