import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';
import CarList from '../components/carList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff',
};

function List() {
  const [cars, setCars] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios('https://wonderful-renata-belajaroioi-02d4cd41.koyeb.app/api/v1/cars');
        setCars(res.data); // Ensure you access the data array correctly
      } catch (error) {
        console.error(error);
      }
    };
    fetchCars();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.lighter}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Daftar Mobil</Text>
      </View>
      <FlatList
        data={cars.data}
        renderItem={({item}) => (
            <CarList style={styles.CarList}
              key={item.id}
              image={{uri : item.img}}
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
  container: {
    flex: 10,
    backgroundColor: '#E8EBEA',
  },
  headerContainer: {
    backgroundColor: COLORS.lighter,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.darker,
  },
  CarList:{
    marginBottom:5,
    borderRadius: 9,
  },
});

export default List;
