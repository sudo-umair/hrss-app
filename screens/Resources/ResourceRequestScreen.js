import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState, useRef } from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import InputField from "../../components/UI/InputField";
import Label from "../../components/UI/Label";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Button from "../../components/UI/Button";
import { postResourceRequest } from "../../utilities/routes/resource";
import { useSelector } from "react-redux";

export default function ResourceRequestScreen({ navigation }) {
  const RESOURCE = useRef();
  const QUANTITY = useRef();
  const DURATION = useRef();
  const PHONE = useRef();
  const ADDRESS = useRef();
  const NOTES = useRef();

  const user = useSelector((state) => state.user);
  const { name, email, phone } = user;

  const [missingFields, setMissingFields] = useState(false);

  const [record, setRecord] = useState({
    name: name,
    email: email,
    userType: "user",
    resourceName: "",
    quantity: "",
    duration: "",
    phone: phone,
    address: "",
    notes: "",
  });

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const emptyFields = () => {
    setRecord({
      resourceName: "",
      quantity: "",
      duration: "",
      address: "",
      notes: "",
    });
  };

  const onPostRequest = async () => {
    if (missingFields) {
      alert("Please fill in all fields");
    } else {
      try {
        const res = await postResourceRequest(record);
        alert(res.message);
        if (res.status === "201") {
          emptyFields();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Request Resource Form",
      headerTitleAlign: "center",
    });

    if (
      record.resourceName.trim() === "" ||
      record.quantity.trim() === "" ||
      record.duration.trim() === "" ||
      record.phone.trim() === "" ||
      record.address.trim() === ""
    ) {
      setMissingFields(true);
    } else {
      setMissingFields(false);
    }
  }, [navigation, record]);

  return (
    <KeyboardAwareScrollView
      style={styles.rootContainer}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.rootContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Please fill out the form below to request a resource.
          </Text>
          <Text style={styles.subTitle}>Use one form for each request *</Text>
          <Label>Email</Label>
          <InputField value={record.email} editable={false} />
          <Label>Resource Name *</Label>
          <InputField
            placeholder="Oxygen Cylinder"
            value={record.resource}
            onChangeText={(value) => onChangeRecord("resourceName", value)}
            onSubmitEditing={() => QUANTITY.current.focus()}
            innerRef={RESOURCE}
            returnKeyType="next"
            autoCapitalize={"words"}
          />
          <Label>Quantity *</Label>
          <InputField
            placeholder="3"
            keyboardType="decimal-pad"
            value={record.quantity}
            onChangeText={(value) => onChangeRecord("quantity", value)}
            onSubmitEditing={() => DURATION.current.focus()}
            innerRef={QUANTITY}
            returnKeyType="next"
          />
          <Label>Duration *</Label>
          <InputField
            placeholder="1 Week"
            value={record.duration}
            onChangeText={(value) => onChangeRecord("duration", value)}
            onSubmitEditing={() => PHONE.current.focus()}
            innerRef={DURATION}
            returnKeyType="next"
            autoCapitalize={"words"}
          />
          <Label>Contact Number *</Label>
          <InputField
            placeholder="Phone or Landline Number"
            value={record.phone}
            onChangeText={(value) => onChangeRecord("phone", value)}
            onSubmitEditing={() => ADDRESS.current.focus()}
            innerRef={PHONE}
            returnKeyType="next"
            keyboardType={"phone-pad"}
          />
          <Label>Address *</Label>
          <InputField
            placeholder="House ABC, Street 8, ...."
            multiline={true}
            numberOfLines={2}
            value={record.address}
            onChangeText={(value) => onChangeRecord("address", value)}
            innerRef={ADDRESS}
            autoCapitalize={"words"}
            onSubmitEditing={() => PHONE.current.focus()}
            returnKeyType="next"
          />
          <Label>Any Additional Information</Label>
          <InputField
            placeholder="Any additional information"
            multiline={true}
            numberOfLines={3}
            value={record.notes}
            onChangeText={(value) => onChangeRecord("notes", value)}
            innerRef={NOTES}
            autoCapitalize={"words"}
            returnKeyType="done"
          />
          <View style={styles.button}>
            <Button
              buttonColor={gs.colors.buttonColor2}
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
