
import {useEffect, useCallback} from 'react';
import moment from 'moment';
import {FlatList, SafeAreaView, useColorScheme} from 'react-native';

import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../redux/reducers/user';
import {selectOrderList, getOrder} from '../../redux/reducers/Order/list';
import {cancelOrder} from '../../redux/reducers/Order';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import OrderList from '@components/OrderList';
import {selectOrder, setStateByName} from '../../redux/reducers/Order';
import { selectCarDetail } from '../../redux/reducers/cars';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff',
};

function List() {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cars = useSelector(selectCarDetail);
  const orders = useSelector(selectOrderList);
  const order = useSelector(selectOrder);
  const navigation = useNavigation();
console.log('orders wkwk',orders.data.data);
  const fetchOrder = async () => {
      const page = 1;
      // if (!order.data.length || page > order.data?.page && order.status === 'idle') {
      dispatch(getOrder({page, token: user.token}));
      // }
    console.log('Fetched Orders:', orders.data?.data);
  };

  const onCountdownEnd = async(id) => {
      dispatch(cancelOrder(id));
      console.log('id wkwk',id);
  };

  const handleNavigate = (status, id, car_id) => {
      if(status !== 'pending') {
          return navigation.navigate('Order', {id});
      }
      return navigation.navigate('Order', {orderId: id, carId: car_id});
  };
console.log('order',orders.data.data);
  useEffect(() => {
      if(order.status !== 'pending'){
          setTimeout(() => {
             dispatch(setStateByName({
                  name:'status',
                  value:'pending',
             }));
          }, 1000)
      }
  }, [order])

  useFocusEffect(
      useCallback(() => {
          fetchOrder();
      }, [user])
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
              data={orders.data?.data}
              renderItem={({ item, index }) =>
                  <OrderList
                      key={item.id}
                      overdue={moment(item.overdue_time)}
                      carName={item.cars.name}
                      status={item.status}
                      onPress={() => handleNavigate(item.status, item.id)}
                      onCountdownEnd={() => onCountdownEnd(item.id)}
                      date={moment(item.createdDt).format('DD MMMM YYYY')}
                      price={item.total}
                  />
              }
              keyExtractor={item => item.id}
          />
      </SafeAreaView>
  );
}

export default List;
