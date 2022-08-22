import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, useLayoutEffect } from "react";
import UserAvatar from "react-native-user-avatar";
import { useSelector } from "react-redux";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import Button from "../components/UI/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import InputField from "../components/UI/InputField";
import PasswordEye from "../components/UI/PasswordEye";
import Label from "../components/UI/Label";
import { updateAccount } from "../utilities/routes/user";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import { setDataInLocalStorage } from "../utilities/helpers/local-storage";
import { useNavigation } from "@react-navigation/native";

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

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const oldPassword = user?.password;

  useLayoutEffect(() => {
    if (record.password.length < 6) {
      setPasswordError(true);
      setPasswordInfo("Password must be at least 6 characters");
    } else {
      setPasswordError(false);
      setPasswordInfo("");
    }
  }),
    [record.password];

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onUpdateAccountHandler = async () => {
    if (!passwordError) {
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
        console.log(user);
        // navigation.navigate("HomeScreen");
        alert("Account updated successfully");
      }
    } else {
      alert("Please fill out all fields and check for existing errors");
    }
  };

  const goToDeleteAccountScreen = async () => {
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
            marginTop: 10,
          }}
          buttonColor={"#ff2c2c"}
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
          onChangeText={(text) => onChangeRecord("phone", text)}
          keyboardType="phone-pad"
          innerRef={Phone}
          onSubmitEditing={onUpdateAccountHandler}
        />
        <Button
          style={{
            marginTop: 10,
            alignSelf: "center",
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
    marginTop: 5,
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
