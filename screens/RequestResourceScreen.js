import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState, useRef } from "react";
import { GlobalStyles as gs } from "../utils/styles";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/UI/InputField";
import Label from "../components/UI/Label";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Button from "../components/UI/Button";

export default function RequestResourceScreen() {
  const navigation = useNavigation();

  const NAME = useRef();
  const RESOURCE = useRef();
  const QUANTITY = useRef();
  const DURATION = useRef();
  const PHONE = useRef();
  const ADDRESS = useRef();

  const [missingFields, setMissingFields] = useState(false);

  const [record, setRecord] = useState({
    name: "",
    resource: "",
    quantity: "",
    duration: "",
    phone: "",
    address: "",
  });

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const onPostRequest = () => {
    if (missingFields) {
      alert("Please fill in all fields");
    } else {
      alert("Request sent");
      console.log(record);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Request Resource",
    });

    if (
      record.name.trim() === "" ||
      record.resource.trim() === "" ||
      record.quantity.trim() === "" ||
      record.duration.trim() === "" ||
      record.phone.trim() === "" ||
      record.address.trim() === ""
    ) {
      setMissingFields(true);
    }
  }, [navigation, record]);

  return (
    <KeyboardAwareScrollView style={styles.rootContainer}>
      <View style={styles.rootContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Please fill out the form below to request a resource.
          </Text>
          <Text style={styles.subTitle}>Use one form for each request *</Text>
          <Label>Full Name</Label>
          <InputField
            placeholder="Muhammad Ali"
            value={record.name}
            onChangeText={(value) => onChangeRecord("name", value)}
            onSubmitEditing={() => RESOURCE.current.focus()}
            returnKeyType="next"
          />
          <Label>Resource Name</Label>
          <InputField
            placeholder="Oxygen Cylinder"
            value={record.resource}
            onChangeText={(value) => onChangeRecord("resource", value)}
            onSubmitEditing={() => QUANTITY.current.focus()}
            innerRef={RESOURCE}
            returnKeyType="next"
          />
          <Label>Quantity</Label>
          <InputField
            placeholder="3"
            keyboardType="decimal-pad"
            value={record.quantity}
            onChangeText={(value) => onChangeRecord("quantity", value)}
            onSubmitEditing={() => DURATION.current.focus()}
            innerRef={QUANTITY}
            returnKeyType="next"
          />
          <Label>Duration</Label>
          <InputField
            placeholder="1 Week"
            value={record.duration}
            onChangeText={(value) => onChangeRecord("duration", value)}
            onSubmitEditing={() => PHONE.current.focus()}
            innerRef={DURATION}
            returnKeyType="next"
          />
          <Label>Contact Number</Label>
          <InputField
            placeholder="Phone or Landline Number"
            value={record.phone}
            onChangeText={(value) => onChangeRecord("phone", value)}
            onSubmitEditing={() => ADDRESS.current.focus()}
            innerRef={PHONE}
            returnKeyType="next"
          />
          <Label>Address</Label>
          <InputField
            placeholder="House ABC, Street 8, ...."
            multiline={true}
            numberOfLines={2}
            value={record.address}
            onChangeText={(value) => onChangeRecord("address", value)}
            innerRef={ADDRESS}
          />
          <View style={styles.button}>
            <Button
              buttonColor={gs.colors.buttonColor2}
              textColor={"black"}
              onPress={onPostRequest}
            >
              Request Resource
            </Button>
          </View>
        </View>
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
    backgroundColor: gs.colors.primary,
    margin: "5%",
    padding: "5%",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: gs.colors.titleColor,
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    color: gs.colors.titleColor,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: "50%",
    alignSelf: "center",
  },
});
