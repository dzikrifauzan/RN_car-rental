import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Button from '../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {getProfile, selectUser, logout} from '../redux/reducers/user';

export default function Akun() {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.data && user.token) {
      dispatch(getProfile(user.token));
    }
  }, [user]);
  return (
    <View style={styles.container}>
      {!user.isLogin ? (
        <View style={styles.authContainer}>
          <Image
            source={require('../assets/images/aluraPark.png')}
            style={styles.logo}
          />
          <Text style={styles.infoText}>
            Upss, kamu belum memiliki akun. Silahkan daftar terlebih dahulu ya.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={styles.authButton}>
            <Text style={styles.authButtonText}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.profileContainer}>
          {/* Header Profil */}
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={{
                uri: user.data?.avatar
                  ? user.data.avatar
                  : 'https://i.pravatar.cc/100',
              }}
            />
            <Text style={styles.greetingText}>Halo, {user.data?.fullname}</Text>
          </View>

          {/* Menu Navigasi */}
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.menuText}>Edit Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('ChangePassword')}>
              <Text style={styles.menuText}>Ganti Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Settings')}>
              <Text style={styles.menuText}>Pengaturan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('OrderList')}>
              <Text style={styles.menuText}>Pesanan Saya</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => dispatch(logout())}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 30,
  },
  authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  authButton: {
    backgroundColor: '#5CB85F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  profileContainer: {
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#5CB85F',
    marginBottom: 15,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userId: {
    fontSize: 14,
    color: '#777',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    fontSize: 16,
    color: '#444',
  },
  logoutButton: {
    backgroundColor: '#A43333',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});
