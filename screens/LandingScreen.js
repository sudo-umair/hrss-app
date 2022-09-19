import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import GradientContainer from "../components/UI/GradientContainer";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import Button from "../components/UI/Button";

export default function LandingScreen({ navigation }) {
  const onPressLogin = () => {
    navigation.navigate("Authentication", { screen: "Signin" });
  };

  const onPressSignup = () => {
    navigation.navigate("Authentication", { screen: "Signup" });
  };

  return (
    <GradientContainer colors={["transparent", "#3b2a25"]}>
      <ImageBackground
        source={require("../assets/images/LandingPage.png")}
        style={styles.backgroundImageContainer}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Share And Care</Text>
          <Text style={styles.subtitle}>
            Share and Care is a platform that connects hospitals and people
            among themselves so they can help each other during any pandemic by
            sharing resources like beds, ventilators, medicines, etc. and also
            by donating to various charities and NGOs.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              buttonColor={gs.colors.buttonColor1}
              onPress={onPressLogin}
              textSize={18}
            >
              Sign In
            </Button>
            <Button
              style={styles.button}
              buttonColor={gs.colors.buttonColor2}
              onPress={onPressSignup}
              textSize={18}
            >
              Sign up
            </Button>
          </View>
        </View>
      </ImageBackground>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  backgroundImage: {},
  container: {
    flex: 1,
    marginTop: "15%",
    marginHorizontal: "5%",
    position: "absolute",
    alignItems: "center",
    top: "50%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    marginVertical: "2%",
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
    marginVertical: "3%",
  },
});
