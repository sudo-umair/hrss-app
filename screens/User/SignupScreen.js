import { Link } from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/UI/Button";
import InputField from "../../components/UI/InputField";
import PasswordEye from "../../components/UI/PasswordEye";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { Platform } from "react-native";
import { signUp } from "../../utilities/routes/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default function SignupScreen({ navigation }) {
  const [record, setRecord] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnic: "",
    phone: "",
  });

  const L_Name = useRef();
  const Email = useRef();
  const Password = useRef();
  const ConfirmPassword = useRef();
  const Cnic = useRef();
  const Phone = useRef();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailInfo, setEmailInfo] = useState("");

  const [cnicError, setCnicError] = useState(false);
  const [cnicInfo, setCnicInfo] = useState("");

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
      record.email.trim().includes("@") === true &&
      record.email.trim().endsWith(".com") === true
    ) {
      setEmailError(false);
      setEmailInfo("");
    } else {
      setEmailError(true);
      setEmailInfo("Please provide a valid email address");
    }

    if (record.cnic.length !== 13) {
      setCnicError(true);
      setCnicInfo("Please provide a valid CNIC");
    } else {
      setCnicError(false);
      setCnicInfo("");
    }
  }, [record.password, record.confirmPassword, record.email, record.cnic]);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onSignUpHandler = async () => {
    if (!passwordError && !emailError) {
      const response = await signUp(record);
      alert(response.message);
      if (response.status === "200") {
        navigation.navigate("Sign In");
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
        <Text style={styles.title}>Sign Up</Text>
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
            onSubmitEditing={() => Cnic.current.focus()}
          />

          <Text style={[styles.info, passwordError && styles.infoActivated]}>
            {passwordInfo}
          </Text>

          <InputField
            placeholder="CNIC (without dashes)"
            value={record.cnic}
            onChangeText={(text) => onChangeRecord("cnic", text)}
            keyboardType="phone-pad"
            innerRef={Cnic}
            onSubmitEditing={() => Phone.current.focus()}
          />
          <Text style={[styles.info, cnicError && styles.infoActivated]}>
            {cnicInfo}
          </Text>
          <InputField
            placeholder="Phone Number"
            value={record.phone}
            onChangeText={(text) => onChangeRecord("phone", text)}
            keyboardType="phone-pad"
            innerRef={Phone}
            onSubmitEditing={onSignUpHandler}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonColor={gs.colors.buttonColor2}
            onPress={onSignUpHandler}
          >
            Sign Up
          </Button>
        </View>
        <Link style={styles.link} to={{ screen: "Signin" }}>
          Already a user? Sign In
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
    height: 18,
    marginTop: -2,
    marginVertical: 5,
  },
  buttonContainer: {
    width: "40%",
  },
  link: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 14,
    color: gs.colors.titleColor,
  },
});
