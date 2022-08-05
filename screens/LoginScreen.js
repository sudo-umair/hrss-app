import { Link } from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Button from "../components/UI/Button";
import GradientContainer from "../components/UI/GradientContainer";
import InputField from "../components/UI/InputField";
import PasswordEye from "../components/UI/PasswordEye";
import { GlobalStyles as gs } from "../utils/styles";
import { login } from "../utils/auth";
import { setData } from "../utils/local-storage";
import { useDispatch } from "react-redux";
import { addUser, setIsLoggedIn } from "../store/user";

export default function LoginScreen() {
  const [record, setRecord] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [renderCount, setRenderCount] = useState(1);

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
    if (renderCount > 1) {
      if (record.password.length < 6) {
        setPasswordError(true);
        setPasswordInfo("Password must be at least 6 characters");
      } else {
        setPasswordError(false);
        setPasswordInfo("");
      }

      if (
        record.email.trim().includes("@") === true &&
        record.email.trim().endsWith(".com") === true
      ) {
        setEmailInfo("");
        setEmailError(false);
      } else {
        setEmailError(true);
        setEmailInfo("Please provide a correct email address");
      }
    }
    setRenderCount(renderCount + 1);
  }, [record.email, record.password]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onLogInHandler = async () => {
    if (!emailError || !passwordError) {
      console.log("Logging in...", record);
      const response = await login(record);
      console.log(response);
      if (response.status === "200") {
        setData(record);
        dispatch(addUser(record.email, record.password));
        dispatch(setIsLoggedIn(true));
      } else {
        alert(response.message);
      }
    } else {
      alert("Please fill out all the fields");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <InputField
            style={emailError && styles.inputError}
            placeholder="Email"
            value={record.email}
            onChangeText={(text) => onChangeRecord("email", text)}
            keyboardType="email-address"
            onSubmitEditing={() => Password.current.focus()}
          />
          <Text style={[styles.info, emailError && styles.infoActivated]}>
            {emailInfo}
          </Text>
          <View style={styles.passwordContainer}>
            <InputField
              style={[styles.passwordInput]}
              placeholder="Password"
              value={record.password}
              onChangeText={(text) => onChangeRecord("password", text)}
              secureTextEntry={!showPassword}
              innerRef={Password}
              onSubmitEditing={onLogInHandler}
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
          <Button buttonColor={gs.colors.buttonColor1} onPress={onLogInHandler}>
            Login
          </Button>
          <Link style={styles.link} to={{ screen: "Signup" }}>
            Not a user? Sign up
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.homeScreenBackground,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: gs.colors.homeScreenTopDisplay,
    margin: 20,
    margin: "5%",
    padding: "5%",
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: gs.colors.titleColor,
  },
  inputContainer: {
    marginBottom: 20,
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
