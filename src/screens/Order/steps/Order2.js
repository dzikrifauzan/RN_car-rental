import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

import {
  selectOrder,
  setStateByName,
  putOrderSlip,
} from '../../../redux/reducers/Order';
import {selectCarDetail} from '../../../redux/reducers/cars';

import CarList from '@components/carList';
import Button from '@components/Button';
import Countdown from '@components/Countdown';
import {formatCurrency} from '@utils/formatCurrency';
import AnimatedModal from '../../../components/Modal/ModalDragable';

const paymentMethods = [
  {bankName: 'BCA', account: 12345678, name: 'a. n Super Travel'},
  {bankName: 'MANDIRI', account: 12345678, name: 'a. n Super Travel'},
  {bankName: 'BNI', account: 12345678, name: 'a. n Super Travel'},
];

export default function Step2() {
  const {data, errorMessage, status, isModalVisible, formData} =
    useSelector(selectOrder);
  const carData = useSelector(selectCarDetail);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const selectedBank = () =>
    paymentMethods.find(el => el.bankName === data?.data?.payment_method);

  const handleUpload = () => {
    if (image) {
      const formData = new FormData();
      formData.append('slip', image);
      dispatch(putOrderSlip({id: data.id, formData}));
    }
  };

  useEffect(() => {
    if (status === 'upload-success') {
      dispatch(setStateByName({name: 'activeStep', value: 2}));
    } else if (errorMessage) {
      console.error(errorMessage);
    }
  }, [status, errorMessage]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.countDownWrapper}>
          <Text style={styles.countDownText}>
            Selesaikan Pembayaran Sebelum
          </Text>
          <Countdown until={moment(data?.data?.overdue_time)} />
        </View>
        <Text style={styles.countDownDate}>
          {moment(data?.data?.overdue_time).format('LLLL')}
        </Text>
        <CarList
          image={{uri: carData.data?.img}}
          carName={carData.data?.name}
          passengers={5}
          baggage={4}
          price={carData.data?.price}
        />
        <Text style={styles.textBold}>Lakukan Transfer Ke</Text>
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentBox}>{selectedBank()?.bankName}</Text>
          <View>
            <Text>{selectedBank()?.bankName} Transfer</Text>
            <Text>{selectedBank()?.name}</Text>
          </View>
        </View>
        <View style={styles.readOnlyInputWrapper}>
          <Text>Nomor Rekening</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.readOnlyInputText}>
              {selectedBank()?.account}
            </Text>
          </View>
        </View>
        <View style={styles.readOnlyInputWrapper}>
          <Text>Total Bayar</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.readOnlyInputText}>
              {formatCurrency.format(data?.data?.total || 0)}
            </Text>
          </View>
        </View>
      </View>

      <AnimatedModal
        isVisible={isModalVisible}
        onClose={() =>
          dispatch(setStateByName({name: 'isModalVisible', value: false}))
        }>
        <View style={styles.modalWrapper}>
          <Text style={styles.textBold}>Konfirmasi Pembayaran</Text>
          <Text>
            Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
            akan segera kami cek. Tunggu beberapa saat untuk mendapatkan
            konfirmasi.
          </Text>
          <Pressable
            style={styles.uploadImage}
            onPress={() => console.log('Pick Image')}>
            {image ? (
              <Image
                source={{uri: image?.uri}}
                resizeMode="cover"
                style={styles.image}
              />
            ) : (
              <Icon name="image" size={50} color="#3C3C3C" />
            )}
          </Pressable>
          <Button title="Upload" color="#3D7B3F" onPress={handleUpload} />
        </View>
      </AnimatedModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, paddingBottom: 20},
  textBold: {fontFamily: 'PoppinsBold', fontSize: 16, marginBottom: 10},
  countDownWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  countDownText: {fontFamily: 'PoppinsBold', fontSize: 17},
  countDownDate: {fontFamily: 'PoppinsBold', fontSize: 14, marginBottom: 20},
  paymentMethod: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  paymentBox: {
    width: '30%',
    textAlign: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    marginRight: 10,
  },
  readOnlyInputWrapper: {marginBottom: 10},
  readOnlyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  readOnlyInputText: {fontFamily: 'PoppinsBold', fontSize: 16},
  modalWrapper: {padding: 20},
  uploadImage: {
    height: 200,
    backgroundColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {width: '100%', height: '100%'},
});
