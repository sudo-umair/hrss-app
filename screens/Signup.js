import { Link } from "@react-navigation/native";
import axios from "axios";
import React, { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import PasswordEye from "../components/UI/PasswordEye";
import { GlobalStyles as gs } from "../utils/styles";
import { Platform } from "react-native";
import GradientContainer from "../components/UI/GradientContainer";
import { GLOBALS } from "../utils/config";

export default function Signup({}) {
  const URL = `${GLOBALS.BASE_URL}/signup`;

  const [record, setRecord] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const L_Name = useRef();
  const Email = useRef();
  const Password = useRef();
  const ConfirmPassword = useRef();
  const PhoneNumber = useRef();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailInfo, setEmailInfo] = useState("");

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  useLayoutEffect(() => {
    if (record.password.length < 6) {
      setPasswordError(true);
      setPasswordInfo("Password must be at least 6 characters");
    } else if (record.password !== record.confirmPassword) {
      setPasswordError(true);
      setPasswordInfo("Password does not match");
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
  }, [record.password, record.confirmPassword, record.email]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onSignUpHandler = () => {
    if (!passwordError && !emailError) {
      axios
        .post(URL, record)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          // if (res.status === 400) {
          //   alert("Email already exists");
          // } else if (res.status === 201) {
          //   alert("Signup successful");
          // } else {
          //   alert("Signup failed");
          // }
          const message = res.data.message;
          console.log(message);
          alert(message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill out all fields and check for existing errors");
    }
  };

  const platform = Platform.OS;
  return (
    <GradientContainer
      colors={[gs.gradientColors.color1, gs.gradientColors.color2]}
      stylesProp={styles.gradientContainer}
      centerContent={true}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareScrollViewContainer}
        style={styles.keyboardAwareScrollViewContent}
      >
        <View style={styles.container}>
          <Text style={styles.title}>SignUp</Text>
          <View style={styles.inputContainer}>
            <View style={styles.nameContainer}>
              <InputField
                style={styles.inputName}
                placeholder="First Name"
                value={record.fName}
                onChangeText={(text) => onChangeRecord("fName", text)}
                autoCapitalize="words"
                autoFocus={true}
              />
              <InputField
                style={styles.inputName}
                placeholder="Last Name"
                value={record.lName}
                onChangeText={(text) => onChangeRecord("lName", text)}
                autoCapitalize="words"
                innerRef={L_Name}
                onSubmitEditing={() => Email.current.focus()}
              />
            </View>
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
            <InputField
              style={passwordError && styles.inputError}
              placeholder="Confirm Password"
              value={record.confirmPassword}
              onChangeText={(text) => onChangeRecord("confirmPassword", text)}
              secureTextEntry={!showPassword}
              innerRef={ConfirmPassword}
              onSubmitEditing={() => PhoneNumber.current.focus()}
            />

            <Text style={[styles.info, passwordError && styles.infoActivated]}>
              {passwordInfo}
            </Text>

            <InputField
              placeholder="Phone Number"
              value={record.phone}
              onChangeText={(text) => onChangeRecord("phone", text)}
              keyboardType="phone-pad"
              innerRef={PhoneNumber}
            />
          </View>
          <View>
            <Button
              buttonColor={gs.colors.buttonColor2}
              onPress={onSignUpHandler}
            >
              Signup
            </Button>
            <Link style={styles.link} to={{ screen: "Login" }}>
              Already a user? Login
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientContainer>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    // height: "100%",
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
    justifyContent: "center",
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
  passwordEye: {
    alignItems: "center",
    paddingTop: 15,
    justifyContent: "center",
  },
  inputName: {
    width: "48%",
    maxWidth: Platform.OS === "web" ? 115 : "100%",
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

  button: {
    width: 100,
    alignSelf: "center",
  },
  link: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 14,
    color: gs.colors.titleColor,
  },
});
