import React, {useState} from "react";
import {Image, StyleSheet, View} from "react-native";
import ActivityIndicator from "./ActivityIndicator";
import colors from "../config/colors";
import LottieView from "lottie-react-native";

function Image2({ children, ...otherProps }) {
  const [loading, setLoading] = useState(false);

  return (
      <>
        <Image onLoadStart={() => setLoading(true)}
               onLoadEnd={() => {setLoading(false)}} {...otherProps}/>
        {children}
        {loading && <View style={styles.loading}>
          <LottieView
              autoPlay
              loop={true}
              source={require("../assets/animations/loader.json")}
              style={styles.animation}
          />
        </View>}
      </>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  animation: {
    width: 200,
  },
});

export default Image2;
