/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useEffect, useCallback} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import axios from 'axios';

import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import CarList from '../components/carList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCars, selectCars} from '../redux/reducers/cars';
import {getProfile, selectUser} from '../redux/reducers/user';
import GeoLoc from '../components/Geolocation';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff',
};

const ButtonIcon = ({icon, title}) => (
  <Button>
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={25} color="#fff" />
    </View>
    <Text style={styles.iconText}>{title}</Text>
  </Button>
);

function Home() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cars = useSelector(selectCars);

  const fetchCars = async (page = 1) => {
    // console.log(page);
    if (
      !cars.data.length ||
      (page > cars.data?.data.page && cars.status === 'idle')
    ) {
      console.log('ssssssssssssssssssssssssssssssssssssssssssssss',cars.data);
      dispatch(getCars(page));
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCars();
    }, []),
  );

  useEffect(() => {
    if (!user.data && user.token) {
      dispatch(getProfile(user.token));
    }
  }, [user]);
  // console.log(user);


  const backgroundStyle = {
    overflow: 'visible',
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.primary}
      />
      {/* end banner */}
      <FlatList
        data={cars.data.data}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.headerText}>
                    Hi, {user ? user.data?.fullname : 'Guest'}
                  </Text>
                  <GeoLoc/>
                </View>
                <View>
                  <Image
                    style={styles.imageRounded}
                    source={{
                      uri:
                        user && user.data?.avatar
                          ? user.data?.avatar
                          : 'https://i.pravatar.cc/100',
                    }}
                    width={50}
                    height={50}
                  />
                </View>
              </View>
              {/* banner */}
              <View
                style={{
                  ...styles.headerContainer,
                  ...styles.bannerContainer,
                }}>
                <View style={styles.bannerDesc}>
                  <Text style={styles.bannerText}>
                    Sewa Mobil Berkualitas di kawasanmu
                  </Text>
                  <Button color={COLORS.secondary} title="Sewa Mobil" />
                </View>
                <View style={styles.bannerImage}>
                  <Image
                    source={require('../assets/images/img_car.png')}
                    width={50}
                    height={50}
                  />
                </View>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <ButtonIcon icon="truck" title="Sewa Mobil" />
              <ButtonIcon icon="box" title="Oleh-Oleh" />
              <ButtonIcon icon="key" title="Penginapan" />
              <ButtonIcon icon="camera" title="Wisata" />
            </View>
          </>
        }
        renderItem={({item, index}) => (
          <CarList
            key={item.id}
            image={{uri: item.img}}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
            onPress={() => navigation.navigate('DetailCar', {id: item.id})}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    height: 130,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // posisi horizontal
    alignItems: 'center', // posisi
    padding: 10,
  },
  imageRounded: {
    borderRadius: 40,
  },
  headerText: {
    color: COLORS.lighter,
    fontWeight: 700,
    fontSize: 12,
  },
  headerTextLocation: {
    color: COLORS.lighter,
    fontWeight: 700,
    fontSize: 14,
  },
  bannerContainer: {
    borderRadius: 4,
    padding: 0,
    backgroundColor: '#AF392F',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginBottom: -200,
  },
  bannerText: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.lighter,
  },
  bannerDesc: {
    paddingHorizontal: 10,
    width: '40%',
  },
  iconContainer: {
    marginTop: 90,
    justifyContent: 'space-between', // Menggunakan space-around agar tombol lebih terpisah
    flexDirection: 'row',
    flexWrap: 'wrap', // Menambahkan wrap untuk memecah baris jika ruangnya sempit
    // width: '100%', // Pastikan kontainer menggunakan seluruh lebar layar
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center', // Menyusun ikon dan teks di tengah
    margin: 10, // Memberikan jarak antar ikon
    width: 60, // Menentukan lebar untuk masing-masing tombol agar lebih konsisten
  },
  iconText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: 'bold',
    // marginTop: 1, // Memberikan jarak antara ikon dan teks
    textAlign: 'center',
  },
});

export default Home;
