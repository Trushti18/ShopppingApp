import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/COLORS';
import Button from '../../component/Button';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  let error = true;
  const onSigninPress = () => {
    if (email.trim() === '') {
      setEmailError('Please enter email.');
      error = true;
    } else {
      setEmailError('');
      error = false;
    }
    if (password.trim() === '') {
      setPasswordError('Please enter password.');
      error = true;
    } else {
      setPasswordError('');
      error = false;
    }

    if (email.trim() !== '' && password.trim() !== '' && !error) {
      navigation.navigate('home');
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/loginBackground.png')}
          style={styles.cornerImage}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.heading}>Experience luxury again.</Text>
        <Text style={styles.subHeading}>Login to your account.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            placeholder="Please enter email."
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
              error = false;
            }}
          />
        </View>
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            placeholder="Please enter password."
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
              error = false;
            }}
            secureTextEntry
          />
        </View>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        <TouchableOpacity style={styles.imageContainer}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button title={'Sign in'} onPress={onSigninPress} />
        </View>
      </View>
      <View style={styles.registerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: COLORS.black, opacity: 0.5}}>
            Don’t have an account ?
          </Text>
          <Text style={{color: COLORS.primary, fontWeight: '600'}}>
            {' Create Account'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cornerImage: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(20),
  },
  imageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  heading: {
    fontSize: 42,
    fontWeight: '400',
    color: COLORS.black,
  },
  subHeading: {
    opacity: 0.5,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    marginTop: 5,
    marginBottom: 20,
  },
  inputContainer: {
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary5,
  },
  forgotPassword: {
    color: COLORS.primary,
    textAlign: 'right',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.primary,
    marginBottom: 5,
  },
});
