import { Link } from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import PasswordEye from "../components/UI/PasswordEye";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import { signIn } from "../utilities/routes/user";
import { setData } from "../utilities/helpers/local-storage";
import { useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../store/user";

export default function SigninScreen() {
  const [record, setRecord] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

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
      record.email.trim().includes("@") === true &&
      record.email.trim().endsWith(".com") === true
    ) {
      setEmailInfo("");
      setEmailError(false);
    } else {
      setEmailError(true);
      setEmailInfo("Please provide a valid email address");
    }
  }, [record.email, record.password]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onSignInHandler = async () => {
    if (!emailError || !passwordError) {
      console.log("Signing in...", record);
      const response = await signIn(record);
      console.log(response);
      if (response.status === "200") {
        setData(record);
        const user = response.user;
        dispatch(setUser(user));
        dispatch(setIsLoggedIn(true));
      } else {
        alert(response.message);
      }
    } else {
      alert("Please fill out all fields and check for existing errors");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputContainer}>
          <InputField
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
              onSubmitEditing={onSignInHandler}
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
        <View style={styles.buttonContainer}>
          <Button
            buttonColor={gs.colors.buttonColor1}
            onPress={onSignInHandler}
          >
            Sign In
          </Button>
        </View>
        <Link style={styles.link} to={{ screen: "Signup" }}>
          Not a user? Sign Up
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: gs.colors.primary,
    margin: 20,
    margin: "5%",
    marginVertical: "10%",
    padding: "5%",
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: gs.colors.titleColor,
  },
  inputContainer: {
    marginVertical: 20,
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
    paddingLeft: 5,
    color: gs.colors.inputBgColor,
  },
  infoActivated: {
    marginTop: -2,
    height: 15,
    marginVertical: 5,
  },
  buttonContainer: {
    width: "40%",
  },
  link: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 14,
    color: gs.colors.titleColor,
  },
});
