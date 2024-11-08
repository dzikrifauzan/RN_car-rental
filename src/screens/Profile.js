import React, {useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';
import CarList from '../components/carList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useNavigation} from '@react-navigation/native';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff',
};

function Profile() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.lighter}
      />
      <View style={styles.headerContainer}>
        <View style={styles.card}>
          <Image source={require('../assets/images/aluraPark.png')} />
          <Text style={styles.textRegister}>
            upss kamoehh lums punya aqunn broooo
          </Text>
          <Button
            style={styles.buttonRegister}
            onPress={() => navigation.navigate('SignUp')}
            title="register"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lighter,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    backgroundColor: COLORS.lighter,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRegister: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.darker,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 90,
  },
  buttonRegister: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.lighter,
    marginBottom: 20,
  },
});

export default Profile;
