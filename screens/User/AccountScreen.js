import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useRef, useLayoutEffect } from 'react';
import UserAvatar from 'react-native-user-avatar';
import { useSelector } from 'react-redux';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import Button from '../../components/UI/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import InputField from '../../components/UI/InputField';
import PasswordEye from '../../components/UI/PasswordEye';
import Label from '../../components/UI/Label';
import { updateAccount, updatePassword } from '../../utilities/routes/user';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user';
import { setDataInLocalStorage } from '../../utilities/helpers/local-storage';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

export default function AccountScreen() {
  const user = useSelector((state) => state.user);
  const [record, setRecord] = useState({
    ...user,
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [originalRecord, setOriginalRecord] = useState(record);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const Password = useRef();
  const NewPassword = useRef();
  const ConfirmNewPassword = useRef();
  const Phone = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState('');

  const [phoneError, setPhoneError] = useState(false);
  const [phoneInfo, setPhoneInfo] = useState('');

  const checkIfRecordChanged = () => {
    if (record.name !== originalRecord.name) {
      return true;
    }
    if (record.phone !== originalRecord.phone) {
      return true;
    }
    return false;
  };

  useLayoutEffect(() => {
    if (record.password.length < 6) {
      setPasswordError(true);
      setPasswordInfo('Password must be at least 6 characters');
    } else if (record.newPassword.length < 6) {
      setPasswordError(true);
      setPasswordInfo('New Password must be at least 6 characters');
    } else if (record.newPassword !== record.confirmNewPassword) {
      setPasswordError(true);
      setPasswordInfo('New Password and Confirm New Password must match');
    } else {
      setPasswordError(false);
      setPasswordInfo('');
    }

    if (record.phone.startsWith('03') === false) {
      setPhoneError(true);
      setPhoneInfo('Phone number must start with 03');
    } else if (record.phone.trim().length !== 11) {
      setPhoneError(true);
      setPhoneInfo('Please provide a valid phone number');
    } else {
      setPhoneError(false);
      setPhoneInfo('');
    }
  }),
    [record.password, record.phone];

  const showPasswordHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowPassword(!showPassword);
  };

  const clearPasswordInputs = () => {
    setRecord({
      ...record,
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  const onUpdateAccountHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (checkIfRecordChanged()) {
      if (!phoneError) {
        const response = await updateAccount(record);
        console.log(response);
        if (response.status === '200') {
          dispatch(setUser(response.user));
          setDataInLocalStorage({
            email: response.user.email,
            token: response.user.token,
          });
        }
        showMessage({
          message: response.message,
          type: response.status === '200' ? 'success' : 'warning',
          icon: response.status === '200' ? 'success' : 'warning',
        });
      } else {
        showMessage({
          message:
            'Please fill out all fields with valid information and check for existing errors',
          type: 'warning',
          icon: 'warning',
        });
      }
    } else {
      showMessage({
        message: 'No changes were made to the account',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const onUpdatePasswordHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!passwordError) {
      const response = await updatePassword(record);
      console.log(response);
      if (response.status === '200') {
        clearPasswordInputs();
      }
      showMessage({
        message: response.message,
        type: response.status === '200' ? 'success' : 'warning',
        icon: response.status === '200' ? 'success' : 'warning',
      });
    } else {
      showMessage({
        message:
          'Please fill out all fields with valid information and check for existing errors',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const goToDeleteAccountScreen = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('DeleteAccount');
  };

  return (
    <KeyboardAwareScrollView
      style={styles.rootContainer}
      keyboardShouldPersistTaps='always'
    >
      <View style={styles.container}>
        <UserAvatar size={100} name={user.name ?? ''} />
        <Text style={styles.name}>{user.name ?? ''}</Text>
        <Text style={styles.email}>{user.email ?? ''}</Text>
        <Button
          onPress={goToDeleteAccountScreen}
          style={{
            marginTop: '2%',
            minWidth: '50%',
          }}
          buttonColor={gs.colors.buttonColor3}
        >
          Delete Account
        </Button>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Update Account</Text>
        <Text
          style={[
            styles.info,
            styles.infoActivated,
            { alignSelf: 'center', marginBottom: '4%' },
          ]}
        >
          Once set Email or Cnic cant be changed
        </Text>
        <Label>Full Name</Label>
        <InputField
          value={record.name}
          onChangeText={(text) => onChangeRecord('name', text)}
          placeholder='Full Name'
          autoCapitalize='words'
          onSubmitEditing={() => Phone.current.focus()}
        />
        <Label>Phone Number</Label>
        <InputField
          value={record.phone}
          placeholder='Phone Number'
          onChangeText={(text) => onChangeRecord('phone', text)}
          keyboardType='phone-pad'
          innerRef={Phone}
          onSubmitEditing={onUpdateAccountHandler}
        />
        <Text style={[styles.info, phoneError && styles.infoActivated]}>
          {phoneInfo}
        </Text>
        <Button
          style={{
            marginTop: 10,
            alignSelf: 'center',
            minWidth: '50%',
          }}
          buttonColor={gs.colors.buttonColor1}
          onPress={onUpdateAccountHandler}
        >
          Update Account
        </Button>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.title}>Update Password</Text>
        <Label>Password</Label>
        <InputField
          value={record.password}
          placeholder='Password'
          onChangeText={(text) => onChangeRecord('password', text)}
          secureTextEntry={!showPassword}
          innerRef={Password}
          onSubmitEditing={() => NewPassword.current.focus()}
        />
        <Label>New Password</Label>

        <InputField
          value={record.newPassword}
          placeholder='New Password'
          onChangeText={(text) => onChangeRecord('newPassword', text)}
          secureTextEntry={!showPassword}
          innerRef={NewPassword}
          onSubmitEditing={() => ConfirmNewPassword.current.focus()}
        />
        <Label>Confirm New Password</Label>

        <View style={styles.passwordContainer}>
          <InputField
            style={styles.passwordInput}
            value={record.confirmNewPassword}
            placeholder='Confirm New Password'
            onChangeText={(text) => onChangeRecord('confirmNewPassword', text)}
            secureTextEntry={!showPassword}
            innerRef={ConfirmNewPassword}
            onSubmitEditing={onUpdatePasswordHandler}
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

        <Button
          style={{
            marginTop: 10,
            alignSelf: 'center',
            minWidth: '50%',
          }}
          buttonColor={gs.colors.buttonColor1}
          onPress={onUpdatePasswordHandler}
        >
          Update Password
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
    padding: '5%',
    backgroundColor: gs.colors.primary,
    borderRadius: 10,
  },
  profileContainer: {
    marginHorizontal: '5%',
    marginBottom: '5%',
    padding: '5%',
    backgroundColor: gs.colors.primary,
    borderRadius: 10,
  },
  name: {
    marginTop: '2%',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  email: {
    marginBottom: '2%',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  passwordInput: {
    width: '85%',
    marginRight: 15,
  },
  passwordEye: {
    alignItems: 'center',
    paddingTop: 15,
    justifyContent: 'center',
  },
  info: {
    height: 0,
    fontSize: 13,
    paddingLeft: 5,
    color: gs.colors.inputBgColor,
  },
  infoActivated: {
    marginTop: -2,
    height: 'auto',
    marginVertical: 5,
  },
});
