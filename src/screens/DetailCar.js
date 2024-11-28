import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Markdown from 'react-native-markdown-display';
import Button from '../components/Button';
import {Row, Col} from '../components/Grid';
import {useNavigation} from '@react-navigation/native';
import {formatCurrency} from '../utils/formatCurrency';
import {useDispatch, useSelector} from 'react-redux';
import {resetState as resetOrderState} from '../redux/reducers/Order';
import {
  selectCarDetail,
  getCarsDetails,
  resetDetailsState,
} from '../redux/reducers/cars';

export default function Detail({route}) {
  const navigation = useNavigation();
  const {id} = route.params;
  const dispatch = useDispatch();
  const carDetail = useSelector(selectCarDetail);

  useEffect(() => {
    if (id !== carDetail.id) {
      dispatch(resetDetailsState());
      dispatch(getCarsDetails(id));
    }
  }, [id]);

  if (carDetail.status === 'loading') {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Button
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon size={32} name="arrow-left" color="#000" />
      </Button>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>{carDetail.data?.name}</Text>
          <Row style={styles.iconWrapper} gap={15}>
            <Col style={styles.textIcon}>
              <Icon size={14} name="users" color="#8A8A8A" />
              <Text style={styles.capacityText}>{carDetail.data?.seat}</Text>
            </Col>
            <Col style={styles.textIcon}>
              <Icon size={14} name="briefcase" color="#8A8A8A" />
              <Text style={styles.capacityText}>{carDetail.data?.baggage}</Text>
            </Col>
          </Row>
          <Image
            style={styles.image}
            source={{ uri: carDetail.data?.img }}
            height={220}
            width={220}
          />
        </View>
        <Markdown style={styles.details}>
          {carDetail.data?.description?.replace(/\\n/g, '\n')}
        </Markdown>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.price}>
          {formatCurrency.format(carDetail.data?.price || 0)}
        </Text>
        <Button
          color="#3D7B3F"
          title="Lanjutkan Pembayaran"
          onPress={() => {
            dispatch(resetOrderState());
            navigation.navigate('Order', { carId: carDetail.data?.id });
          }}
          style={styles.paymentButton}
        />
      </View>
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    contentContainer: {
      paddingTop: 30,
      paddingHorizontal: 20,
    },
    heading: {
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontFamily: 'PoppinsBold',
      marginBottom: 10,
      color: '#333',
    },
    iconWrapper: {
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    image: {
      borderRadius: 15,
     width: 320,
     height: 220,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    details: {
      body: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        color: '#555',
      },
      bullet_list: {
        marginBottom: 10,
      },
      heading2: {
        fontSize: 18,
        fontFamily: 'PoppinsBold',
        marginBottom: 10,
      },
    },
    price: {
      fontFamily: 'PoppinsBold',
      fontSize: 22,
      marginBottom: 10,
      color: '#333',
    },
    footer: {
      backgroundColor: '#f4f4f4',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      alignItems: 'center',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    backButton: {
      alignItems: 'flex-start',
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 40,
      left: 20,
      zIndex: 9,
    },
    textIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    capacityText: {
      fontSize: 14,
      color: '#8A8A8A',
    },
    paymentButton: {
      width: '100%',
      paddingVertical: 12,
      borderRadius: 10,
      marginTop: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
  });
  