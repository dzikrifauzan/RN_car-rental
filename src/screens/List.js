import {useCallback} from 'react';
import {FlatList, SafeAreaView, useColorScheme} from 'react-native';

import CarList from '../components/carList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useDispatch, useSelector} from 'react-redux';
// import {selectUser} from '../redux/reducers/user';
import {getCars, selectCars} from '../redux/reducers/cars';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff',
};

function List() {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const cars = useSelector(selectCars);
  const navigation = useNavigation();

  const fetchCars = async (page = 1) => {
    console.log(cars.data.data);
    if (
      !cars.data.length ||
      (page > cars.data?.data.page && cars.status === 'idle')
    ) {
      // console.log(cars);
      dispatch(getCars(page));
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCars();
    }, []),
  );

 
  const backgroundStyle = {
    // overflow: 'visible',
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.lighter}
      />
      {/* end banner */}
      <FlatList
        data={cars.data?.data}
        renderItem={({item, index}) => (
          <CarList
            key={item.id}
            image={{uri: item.img}}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
            onEndReached={() => fetchCars((cars.data?.page || 1) + 1)}
            onEndReachedThreshold={0.8}
            onPress={ navigation.navigate}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default List;
