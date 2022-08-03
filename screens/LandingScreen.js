import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import GradientContainer from "../components/UI/GradientContainer";
import { GlobalStyles as gs } from "../utils/styles";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen({ navigation }) {
  const navigate = useNavigation();
  const onPressLogin = () => {
    navigation.navigate("Authentication", { screen: "Login" });
  };

  const onPressSignup = () => {
    navigation.navigate("Authentication", { screen: "Signup" });
  };

  return (
    <GradientContainer colors={["transparent", "#3b2a25"]}>
      <ImageBackground
        source={require("../assets/LandingPageBackground.png")}
        style={styles.backgroundImageContainer}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Share And Care</Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            maxime illum. Laborum quam eius animi voluptatibus eligendi officia
            nihil, iure quos labore!
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              buttonColor={gs.colors.buttonColor1}
              onPress={onPressLogin}
            >
              Login
            </Button>
            <Button
              style={styles.button}
              buttonColor={gs.colors.buttonColor2}
              onPress={onPressSignup}
            >
              Signup
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
  backgroundImage: {
    // opacity: 0.7,
  },
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
    // color: "white",
    // textTransform: "uppercase",
  },
  subtitle: {
    marginTop: "5%",
    textAlign: "center",
  },
  buttonContainer: {
    width: "40%",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  button: {
    width: "100%",
    marginBottom: 10,
  },
});
