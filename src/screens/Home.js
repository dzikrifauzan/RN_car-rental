/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import axios from 'axios';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import CarList from '../components/carList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff',
};

const ButtonIcon = ({icon, title}) => (
  <Button style={styles.buttonIcon}>
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={25} color="#fff" />
    </View>
    <Text style={styles.iconText}>{title}</Text>
  </Button>
);


function Home() {
  const [cars, setCars] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios(
          'https://wonderful-renata-belajaroioi-02d4cd41.koyeb.app/api/v1/cars',
        );
        console.log(res.data);
        setCars(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchCars();
  }, []);

  const backgroundStyle = {
    overflow: 'visible',
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    <SafeAreaView>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.primary}
      />
      <FlatList
        data={cars.data}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.headerText}>Hi, There!</Text>
                  <Text style={styles.headerTextLocation}>Your Location</Text>
                </View>
                <View>
                  <Image
                    style={styles.imageRounded}
                    source={{uri: 'https://i.pravatar.cc/100'}}
                    width={35}
                    height={35}
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
        renderItem={({item}) => (
          <CarList style={styles.CarList}
            key={item.id}
            image={{uri: item.img}}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
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
    height: 150,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // posisi horizontal
    alignItems: 'center', // posisi
    padding: 23,
  },
  imageRounded: {
    borderRadius: 40,
  },
  headerText: {
    color: COLORS.lighter,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: -9,
    marginBottom: 7,
  },
  headerTextLocation: {
    color: COLORS.lighter,
    fontSize: 14,
    marginLeft: -9,
    fontWeight: 'bold',
  },
  bannerContainer: {
    borderRadius: 4,
    padding: 0,
    backgroundColor: '#AF392F',
    marginHorizontal: 15,
    flexWrap: 'wrap',
    marginBottom: -200,
  },
  bannerText: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.lighter,
  },
  bannerDesc: {
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '40%',
  },
  iconContainer: {
    marginTop: 90,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  iconWrapper: {
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    padding: 20,
  },
  iconText: {
    color: '#00000',
    fontSize: 12,
    fontWeight: 700,
    minWidth: 65,
    marginTop: 5,
    textAlign: 'center',
  },
  CarList:{
    marginBottom:5,
    borderRadius: 9,
  },
});

export default Home;
