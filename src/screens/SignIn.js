import {
  Button,
  Alert,
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Link, useNavigation} from '@react-navigation/native';
import axios from 'axios';

function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.45:3000/api/v1/auth/signin', //change to your api
        {
          email,
          password,
        },
        {timeout: 100000},
      );
      console.log(response);
      if (response.data) {
        // Navigate to another screen or show a success message
        Alert.alert('Login Successful', 'Welcome back!');
        navigation.navigate('home');
      } else {
        Alert.alert(
          'Login Failed',
          response.data.message || 'Invalid credentials',
        );
      }
    } catch (error) {
      console.error('Login error:', error.response);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  return (
    <View>
      <Image source={require('../assets/images/tmmin.png')} />
      <Text>Welcome Back</Text>
      <View>
        <View>
          <Text style={styles.text}>Email</Text>
          <TextInput
            placeholder="Contoh: johndee@gmail.com"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.text}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="6+ Karakter"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button
          onPress={handleLogin}
          title="Login"
          color="#5CB85F"
          style={styles.button}
        />
      </View>
      <View>
        <Text>
          don't have an Account?<Link screen="SignUp">Sign Up here</Link>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
export default SignIn;
