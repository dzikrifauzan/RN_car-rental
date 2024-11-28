import {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressStep, ProgressSteps} from 'react-native-progress-stepper';

import {formatCurrency} from '../../utils/formatCurrency';

import Step1 from './steps/Order1';
import Step2 from './steps/Order2';
import Step3 from './steps/Order3';

import {selectCarDetail} from '../../redux/reducers/cars';
import {
  selectOrder,
  setStateByName,
  postOrder,
} from '../../redux/reducers/Order';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

export default function Order() {
  const carDetails = useSelector(selectCarDetail);
  const {activeStep, selectedBank, status, errorMessage, formData} =
    useSelector(selectOrder);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOrder = () => {
    if (formData) {
      dispatch(postOrder(formData));
    }
  };

  useEffect(() => {
    if (status === 'success') {
      dispatch(setStateByName({name: 'activeStep', value: 1}));
    } else if (status === 'error') {
      console.error('Error:', errorMessage);
    }
  }, [status, dispatch, errorMessage]);

  const renderFooter = () => {
    if (activeStep === 0) {
      return (
        <>
          <Text style={styles.price}>
            {formatCurrency.format(carDetails.data?.price || 0)}
          </Text>
          <Button
            disabled={!selectedBank}
            color="#3D7B3F"
            onPress={handleOrder}
            title="Lanjutkan Pembayaran"
          />
        </>
      );
    }
    if (activeStep === 1) {
      return (
        <>
          <Text style={styles.label}>
            Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
          </Text>
          <Button
            color="#3D7B3F"
            style={{marginBottom: 10}}
            onPress={() =>
              dispatch(setStateByName({name: 'isModalVisible', value: true}))
            }
            title="Konfirmasi Pembayaran"
          />
          <Button
            color="#3D7B3F"
            title="Lihat Daftar Pesanan"
            onPress={() => navigation.navigate('HomeTabs')}
          />
        </>
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ProgressSteps activeStep={activeStep}>
        <ProgressStep label="Pilih Metode" removeBtnRow={true}>
          <Step1 />
        </ProgressStep>
        <ProgressStep label="Bayar" removeBtnRow={true}>
          <Step2 />
        </ProgressStep>
        <ProgressStep label="Tiket" removeBtnRow={true}>
          <Step3 />
        </ProgressStep>
      </ProgressSteps>
      <View style={styles.footer}>{renderFooter()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: 'PoppinsBold',
    fontSize: 20,
    marginBottom: 10,
  },
  label: {
    fontFamily: 'PoppinsBold',
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: '#eeeeee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
});
