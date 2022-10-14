import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState, useRef } from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import InputField from "../../components/UI/InputField";
import Label from "../../components/UI/Label";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Button from "../../components/UI/Button";
import { postResourceRequest } from "../../utilities/routes/resource";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";

export default function PostRequestScreen({ navigation }) {
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
    userType: "user",
    resourceName: "",
    resourceQuantity: "",
    resourceDuration: "",
    resourceNotes: "",
    requestedByName: name,
    requestedByEmail: email,
    requestedByPhone: phone,
    requestedByAddress: "",
  });

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const emptyFields = () => {
    setRecord({
      resourceName: "",
      resourceQuantity: "",
      resourceDuration: "",
      resourceNotes: "",
      requestedByName: name,
      requestedByEmail: email,
      requestedByPhone: phone,
      requestedByAddress: "",
    });
  };

  const onPostRequest = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (missingFields) {
      showMessage({
        message: "Please fill in all the required fields",
        type: "warning",
        icon: "warning",
      });
    } else {
      try {
        const response = await postResourceRequest(record);
        showMessage({
          message: response.message,
          type: response.status === "201" ? "success" : "warning",
          icon: response.status === "201" ? "success" : "warning",
        });
        if (response.status === "201") {
          emptyFields();
          navigation.goBack();
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
      record.resourceQuantity.trim() === "" ||
      record.resourceDuration.trim() === "" ||
      record.requestedByAddress.trim() === "" ||
      record.requestedByPhone.trim() === ""
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
          <InputField value={record.requestedByEmail} editable={false} />
          <Label>Resource Name *</Label>
          <InputField
            placeholder="Blood Bags"
            value={record.resourceName}
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
            value={record.resourceQuantity}
            onChangeText={(value) => onChangeRecord("resourceQuantity", value)}
            onSubmitEditing={() => DURATION.current.focus()}
            innerRef={QUANTITY}
            returnKeyType="next"
          />
          <Label>Duration *</Label>
          <InputField
            placeholder="1 Week"
            value={record.resourceDuration}
            onChangeText={(value) => onChangeRecord("resourceDuration", value)}
            onSubmitEditing={() => PHONE.current.focus()}
            innerRef={DURATION}
            returnKeyType="next"
            autoCapitalize={"words"}
          />
          <Label>Contact Number *</Label>
          <InputField
            placeholder="Phone or Landline Number"
            value={record.requestedByPhone}
            onChangeText={(value) => onChangeRecord("requestedByPhone", value)}
            onSubmitEditing={() => ADDRESS.current.focus()}
            innerRef={PHONE}
            returnKeyType="next"
            keyboardType={"phone-pad"}
          />
          <Label>Address *</Label>
          <InputField
            placeholder="House ABC, Street 8, ...."
            value={record.requestedByAddress}
            onChangeText={(value) =>
              onChangeRecord("requestedByAddress", value)
            }
            onSubmitEditing={() => NOTES.current.focus()}
            innerRef={ADDRESS}
            autoCapitalize={"words"}
            returnKeyType="next"
          />
          <Label>Any Additional Information</Label>
          <InputField
            placeholder="Any additional information"
            multiline={true}
            numberOfLines={2}
            value={record.resourceNotes}
            onChangeText={(value) => onChangeRecord("resourceNotes", value)}
            autoCapitalize={"words"}
            returnKeyType="done"
            style={{
              textAlignVertical: "top",
            }}
            innerRef={NOTES}
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
