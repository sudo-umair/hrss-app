import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, useLayoutEffect } from "react";
import UserAvatar from "react-native-user-avatar";
import { useSelector } from "react-redux";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import Button from "../../components/UI/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import InputField from "../../components/UI/InputField";
import PasswordEye from "../../components/UI/PasswordEye";
import Label from "../../components/UI/Label";
import { updateAccount } from "../../utilities/routes/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user";
import { setDataInLocalStorage } from "../../utilities/helpers/local-storage";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";

export default function AccountScreen() {
  const user = useSelector((state) => state.user);
  const [record, setRecord] = useState({ ...user });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const Password = useRef();
  const Phone = useRef();

  const oldPassword = user?.password;
  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState("");

  const [phoneError, setPhoneError] = useState(false);
  const [phoneInfo, setPhoneInfo] = useState("");

  useLayoutEffect(() => {
    if (record.password.length < 6) {
      setPasswordError(true);
      setPasswordInfo("Password must be at least 6 characters");
    } else {
      setPasswordError(false);
      setPasswordInfo("");
    }

    if (record.phone.startsWith("03") === false) {
      setPhoneError(true);
      setPhoneInfo("Phone number must start with 03");
    } else if (record.phone.length !== 11) {
      setPhoneError(true);
      setPhoneInfo("Please provide a valid phone number");
    } else {
      setPhoneError(false);
      setPhoneInfo("");
    }
  }),
    [record.password, record.phone];

  const showPasswordHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowPassword(!showPassword);
  };

  const onUpdateAccountHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!passwordError && !phoneError) {
      const updatedRecord = {
        ...record,
        oldPassword,
      };
      const response = await updateAccount(updatedRecord);
      console.log(response);
      if (response.status === "200") {
        dispatch(setUser(record));
        setDataInLocalStorage({
          email: record.email,
          password: record.password,
        });
      }
      showMessage({
        message: response.message,
        description:
          response.status === "200"
            ? ""
            : "Couldn't reach servers at the moment",
        type: "warning",
        icon: "warning",
      });
    } else {
      showMessage({
        message: "Acount Update Failed",
        description:
          "Please fill out all fields with valid information and check for existing errors",
        type: "warning",
        icon: "warning",
      });
    }
  };

  const goToDeleteAccountScreen = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate("DeleteAccount");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.rootContainer}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <UserAvatar size={100} name={record?.name} />
        <Text style={styles.name}>{record?.name}</Text>
        <Button
          onPress={goToDeleteAccountScreen}
          style={{
            marginTop: "2%",
            minWidth: "50%",
          }}
          buttonColor={gs.colors.buttonColor3}
        >
          Delete Account
        </Button>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Update Account</Text>
        <Label>Full Name</Label>
        <InputField
          value={record.name}
          onChangeText={(text) => onChangeRecord("name", text)}
          autoCapitalize="words"
          autoFocus={true}
          onSubmitEditing={() => Password.current.focus()}
        />
        <Label>Email</Label>
        <InputField value={record.email} editable={false} />
        <Label>Cnic</Label>
        <InputField value={record.cnic} editable={false} />
        <Text style={[styles.info, styles.infoActivated]}>
          Once set Email or Cnic cant be changed
        </Text>
        <Label>Password</Label>
        <View style={styles.passwordContainer}>
          <InputField
            style={styles.passwordInput}
            value={record.password}
            onChangeText={(text) => onChangeRecord("password", text)}
            secureTextEntry={!showPassword}
            innerRef={Password}
            onSubmitEditing={() => Phone.current.focus()}
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

        <Label>Phone Number</Label>
        <InputField
          value={record.phone}
          placeholder="Phone Number (starting with 03)"
          onChangeText={(text) => onChangeRecord("phone", text)}
          keyboardType="phone-pad"
          innerRef={Phone}
          onSubmitEditing={onUpdateAccountHandler}
        />
        <Text style={[styles.info, phoneError && styles.infoActivated]}>
          {phoneInfo}
        </Text>
        <Button
          style={{
            marginTop: 10,
            alignSelf: "center",
            minWidth: "50%",
          }}
          buttonColor={gs.colors.buttonColor1}
          onPress={onUpdateAccountHandler}
        >
          Update Account
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
    padding: "5%",
    backgroundColor: gs.colors.primary,
    borderRadius: 10,
  },
  profileContainer: {
    marginHorizontal: "5%",
    marginBottom: "5%",
    padding: "5%",
    backgroundColor: gs.colors.primary,
    borderRadius: 10,
  },
  name: {
    marginVertical: "2%",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
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
  info: {
    height: 0,
    fontSize: 13,
    paddingLeft: 5,
    color: gs.colors.inputBgColor,
  },
  infoActivated: {
    marginTop: -2,
    height: 18,
    marginVertical: 5,
  },
});
