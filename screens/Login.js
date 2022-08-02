import { Link } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Button from "../components/UI/Button";
import GradientContainer from "../components/UI/GradientContainer";
import InputField from "../components/UI/InputField";
import PasswordEye from "../components/UI/PasswordEye";
import { GlobalStyles, GlobalStyles as gs } from "../utils/styles";
import { GLOBALS } from "../utils/config";

export default function Login() {
  const URL = `${GLOBALS.BASE_URL}/login`;

  const [record, setRecord] = useState({
    email: "",
    password: "",
  });

  const Email = useRef();
  const Password = useRef();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailInfo, setEmailInfo] = useState("");

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value.trim() });
  };

  useLayoutEffect(() => {
    if (record.password.length < 6) {
      setPasswordError(true);
      setPasswordInfo("Password must be at least 6 characters");
    } else {
      setPasswordError(false);
      setPasswordInfo("");
    }

    if (
      record.email.trim().includes("@") === false ||
      record.email.trim().includes(".com") === false
    ) {
      setEmailError(true);
      setEmailInfo("Please provide a correct email address");
    } else {
      setEmailError(false);
      setEmailInfo("");
    }
  }, [record.password, record.email]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onLogInHandler = () => {
    if (!emailError || !passwordError) {
      console.log("Logging in...", record);
      axios
        .post(URL, record)
        .then((res) => {
          const message = res.data.message;
          alert(message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill out all the fields");
    }
  };

  return (
    <GradientContainer
      colors={[gs.gradientColors.color1, gs.gradientColors.color2]}
      centerContent={true}
      stylesProp={styles.gradientContainer}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareScrollViewContainer}
        style={styles.keyboardAwareScrollViewContent}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <InputField
              style={emailError && styles.inputError}
              placeholder="Email"
              value={record.email}
              onChangeText={(text) => onChangeRecord("email", text)}
              keyboardType="email-address"
              innerRef={Email}
              onSubmitEditing={() => Password.current.focus()}
            />
            <Text style={[styles.info, emailError && styles.infoActivated]}>
              {emailInfo}
            </Text>
            <View style={styles.passwordContainer}>
              <InputField
                style={[
                  styles.passwordInput,
                  passwordError && styles.inputError,
                ]}
                placeholder="Password"
                value={record.password}
                onChangeText={(text) => onChangeRecord("password", text)}
                secureTextEntry={!showPassword}
                innerRef={Password}
                onSubmitEditing={() => ConfirmPassword.current.focus()}
              />
              <PasswordEye
                onPress={showPasswordHandler}
                iconSwitch={showPassword}
                colorSwitch={passwordError}
              />
            </View>

            <Text style={[styles.info, passwordError && styles.infoActivated]}>
              {passwordInfo}
            </Text>
          </View>
          <View>
            <Button
              buttonColor={GlobalStyles.colors.buttonColor1}
              onPress={onLogInHandler}
            >
              Login
            </Button>
            <Link style={styles.link} to={{ screen: "Signup" }}>
              Not a user? Sign up
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    // paddingBottom: 10,
  },
  keyboardAwareScrollViewContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  keyboardAwareScrollViewContent: {
    marginTop: 40,
    marginBottom: 10,
  },
  container: {
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: gs.colors.titleColor,
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    padding: 10,
    marginTop: 15,
    backgroundColor: gs.colors.inputBgColor,
    borderRadius: 10,
    elevation: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  passwordContainer: {
    flexDirection: "row",
  },
  passwordInput: {
    width: "85%",
    marginRight: 15,
  },
  inputError: {
    backgroundColor: gs.colors.inputBgError,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    height: 0,
    fontSize: 13,
    marginTop: 1,
    paddingLeft: 5,
    color: gs.colors.inputBgColor,
  },
  infoActivated: {
    height: 15,
    marginTop: 10,
  },
  link: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 14,
    color: gs.colors.titleColor,
  },
});
