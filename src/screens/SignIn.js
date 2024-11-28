import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {postLogin, selectUser} from '../redux/reducers/user';

// Komponen
import Button from '../components/Button';
import ModalPopup from '../components/modal';
import GoogleButton from '../components/GoogleButton';

const initialFormState = {
  email: '',
  password: '',
};

export default function SignIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // state.user
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (val, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSubmit = async () => {
    await dispatch(postLogin(formData));
  };

  useEffect(() => {
    if (user.status === 'success') {
      setModalVisible(true);
      setErrorMessage(null);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('HomeTabs', {screen: 'Profile'});
      }, 1000);
    } else if (user.status === 'failed') {
      setModalVisible(true);
      setErrorMessage(user.message);
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }
  }, [navigation, user]);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.authWrapper}>
        <ModalPopup visible={modalVisible}>
          <View style={styles.modalBackground}>
            {errorMessage ? (
              <>
                <Icon size={32} name="x-circle" color="red" />
                {Array.isArray(errorMessage) ? (
                  errorMessage.map((err, index) => (
                    <Text key={index} style={{color: 'red'}}>
                      {err.message}
                    </Text>))) : (<Text style={{color: 'red'}}>{errorMessage}</Text>)}
              </> ) : ( <>
                <Icon size={32} name="check-circle" color="green" />
                <Text style={{color: 'green'}}>Berhasil Login!</Text>
              </> )}
          </View>
        </ModalPopup>
        <View style={styles.container}>
          <Image source={require('../assets/images/tmmin.png')} />
          <Text style={styles.authTitle}>Welcome Back!</Text>
          <View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: admin@toyota.com"
                onChangeText={text => handleChange(text, 'email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="8+ Karakter"
                onChangeText={text => handleChange(text, 'password')}
              />
            </View>
            <Button onPress={handleSubmit} title="Sign In" color="#5CB85F" />
            <GoogleButton style={styles.googleButton} />
          </View>
          <View>
            <Text style={styles.authFooterText}>
              Don’t have an account?{' '}
              <Link screen="SignUp" style={{color: 'blue'}}>
                Sign Up for free
              </Link>
            </Text>
            <View style={styles.imageAlura}>
              <Image source={require('../assets/images/aluraPark.png')} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authWrapper: {
    flex: 1,
    padding: 20,
  },
  authTitle: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  authFooterText: {
    marginTop: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  imageAlura: {
    alignItems: 'center',
  },
  modalBackground: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
  },
});
