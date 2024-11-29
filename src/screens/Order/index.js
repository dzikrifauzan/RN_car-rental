//ketika di klik order di listOrder, tapi dia gak sesuai dengan apa yang di order
//misal diklik order yaris, tapi pas masuk screen order yang muncul zenix
//jadinya si ordernya nyimpen data zenix yang dari formData




import {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressStep, ProgressSteps} from 'react-native-progress-stepper';

import {formatCurrency} from '../../utils/formatCurrency';

import Step1 from './steps/Order1';
import Step2 from './steps/Order2';
import Step3 from './steps/Order3';

import { getCars, selectCarDetail} from '../../redux/reducers/cars';
import {
  selectOrder,
  setStateByName,
  postOrder,
} from '../../redux/reducers/Order';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import { useFocusEffect } from '@react-navigation/native';
import { selectUser } from '../../redux/reducers/user';

export default function Order() {
  const carDetails = useSelector(selectCarDetail);
  const {activeStep, selectedBank, status, errorMessage, formData} =
    useSelector(selectOrder);
  const dispatch = useDispatch();
  const handleOrder = () => {
    if (formData) {
      dispatch(postOrder(formData));
    }
  };
  
  const user = useSelector(selectUser)


    useFocusEffect(
      useCallback(() => {
        if (user.token) {
          dispatch(getCars(user.token));
        }
      }, [user, dispatch])
    );
  return (
    <View style={styles.container}>
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
      <View style={styles.footer}>
        {activeStep === 0 && (
          <>
            <Text style={styles.price}>
              {formatCurrency.format(carDetails.data?.price || 0)}
            </Text>
            <Button
              disabled={!selectedBank && true}
              color="#3D7B3F"
              onPress={handleOrder}
              title="Lanjutkan Pembayaran"
            />
          </>
        )}
        {activeStep === 1 && (
          <>
            <Text style={styles.label}>
              Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
            </Text>
            <Button
              color="#3D7B3F"
              style={styles.buttonMargin}
              onPress={() => {
                dispatch(setStateByName({name: 'isModalVisible', value: true}));
              }}
              title="Konfirmasi Pembayaran"
            />
            <Button
              color="#ffffff"
              textColor="#000"
              title="Lihat Daftar Pesanan"
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  buttonMargin: {
    marginBottom: 10,
  },
});
