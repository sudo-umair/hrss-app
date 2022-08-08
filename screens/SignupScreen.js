import { Link } from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import PasswordEye from "../components/UI/PasswordEye";
import { GlobalStyles as gs } from "../utils/styles";
import { Platform } from "react-native";
import { signup } from "../utils/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default function SignupScreen({ navigation }) {
  const [renderCount, setRenderCount] = useState(1);
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
    if (renderCount > 1) {
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
        record.email.trim().includes("@") === true &&
        record.email.trim().endsWith(".com") === true
      ) {
        setEmailError(false);
        setEmailInfo("");
      } else {
        setEmailError(true);
        setEmailInfo("Please provide a correct email address");
      }
    }
    setRenderCount(renderCount + 1);
  }, [record.password, record.confirmPassword, record.email]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onSignUpHandler = async () => {
    if (!passwordError && !emailError) {
      const response = await signup(record);
      console.log(response);
      alert(response.message);
      if (response.status === "200") {
        navigation.navigate("Login");
      }
    } else {
      alert("Please fill out all fields and check for existing errors");
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={styles.rootContainer}
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
              onSubmitEditing={() => L_Name.current.focus()}
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
              style={styles.passwordInput}
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
            onSubmitEditing={onSignUpHandler}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonColor={gs.colors.buttonColor2}
            onPress={onSignUpHandler}
          >
            Signup
          </Button>
        </View>
        <Link style={styles.link} to={{ screen: "Login" }}>
          Already a user? Login
        </Link>
      </View>
    </KeyboardAwareScrollView>
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
    margin: "5%",
    padding: "5%",
    marginVertical: "10%",
    borderRadius: 10,
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
