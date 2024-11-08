import {Button,StyleSheet, TextInput, Text, Image, View} from 'react-native';
import React from 'react';
import {Link, useNavigation} from '@react-navigation/native';
function SignUp() {
    const navigation = useNavigation();
  return (
    <View>
      <Image source={require('../assets/images/tmmin.png')} />
      <Text>Welcome Back</Text>
      <View>
        <View>
          <Text>Name</Text>
          <TextInput placeholder="Full Name" />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput placeholder="Example: john@toyota.co.id" />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput secureTextEntry={true} placeholder="8+ Character" />
        </View>
        <Button
            style={styles.buttonRegister}
            onPress={() => navigation.navigate('home')}
            title="register"
          />
          <View>
            <Text>Already have an Account?<Link screen="SignIn">Sign In here</Link></Text>
          </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
});
export default SignUp;
