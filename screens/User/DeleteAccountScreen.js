import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useRef } from "react";
import { clearDataInLocalStorage } from "../../utilities/helpers/local-storage";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/user";
import AnimatedLottieView from "lottie-react-native";
import Button from "../../components/UI/Button";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { Link } from "@react-navigation/native";
import { deleteAccount } from "../../utilities/routes/user";

export default function DeleteAccountScreen({ navigation }) {
  const dispatch = useDispatch();

  const onDeleteAccountHandler = async () => {
    const response = await deleteAccount(user.email, user.password);
    console.log(response);
    alert(response.message);
    if (response.status === "200") {
      dispatch(removeUser());
      clearDataInLocalStorage();
      navigation.navigate("LandingScreen");
    }
  };

  const animation = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Delete Account",
    });
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <AnimatedLottieView
          loop={true}
          autoPlay={true}
          ref={animation}
          style={{
            width: 300,
            height: 300,
          }}
          source={require("../../assets/animations/signout.json")}
        />
        <Text style={styles.title}>Deleting Your Account??</Text>
        <Text style={styles.subTitle}>
          We are sorry to let you go! But remember this action is irreversible
          and all of your data would be lost
        </Text>
      </View>
      <Button buttonColor={"red"} onPress={onDeleteAccountHandler}>
        Delete Account
      </Button>
      <View style={styles.feedbackContainer}>
        <Text style={styles.text}>
          Before you go! We would love your feedback
        </Text>
        <Link style={styles.link} to={{ screen: "Feedback" }}>
          <Text>Click Here</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: gs.colors.background,
  },
  container: {
    alignItems: "center",
    margin: "5%",
    padding: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: gs.colors.text,
    marginTop: 15,
    textAlign: "center",
  },
  feedbackContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    color: gs.colors.text,
  },
  link: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
