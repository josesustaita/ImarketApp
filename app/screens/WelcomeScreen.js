import React, { useEffect, useRef } from "react";
import {
  AccessibilityInfo,
  Animated,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";

import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  const reveal = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduced) => {
        if (!mounted || reduced) return;
        reveal.setValue(0);
        Animated.timing(reveal, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start();
      })
      .catch(() => {});
    const onReducedMotion = (reduced) => {
      if (reduced) {
        reveal.stopAnimation();
        reveal.setValue(1);
      }
    };
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      onReducedMotion,
    );
    return () => {
      mounted = false;
      reveal.stopAnimation();
      if (subscription && subscription.remove) subscription.remove();
      else
        AccessibilityInfo.removeEventListener(
          "reduceMotionChanged",
          onReducedMotion,
        );
    };
  }, [reveal]);
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
      blurRadius={10}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: reveal,
            transform: [
              {
                translateY: reveal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Image
          source={require("../assets/logo-red.png")}
          style={styles.logo}
          accessibilityLabel="I Market"
        />
        <Text style={styles.tagline}>Discover lost treasure.</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  logo: {
    width: 240,
    height: 240,
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
