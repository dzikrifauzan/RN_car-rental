import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  View,
  PanResponder,
  Modal,
  StyleSheet,
} from 'react-native';

export default function AnimatedModal({
  children,
  isVisible,
  onClose = () => {},
}) {
  const screenHeight = Dimensions.get('window').height;
  const pan = useRef(new Animated.Value(screenHeight)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 100) {
        Animated.timing(pan, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          pan.setValue(screenHeight); // Reset posisi setelah animasi selesai
          onClose(); // Tutup modal
        });
      } else {
        Animated.spring(pan, {
          toValue: 0,
          tension: 40,
          friction: 10,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    if (isVisible) {
      Animated.timing(pan, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  return (
    <Modal visible={isVisible} transparent={true} animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.container,
            {
              transform: [{ translateY: pan }],
            },
          ]}>
          <View style={styles.bar} />
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  bar: {
    height: 4,
    width: 50,
    borderRadius: 2,
    backgroundColor: '#999',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
