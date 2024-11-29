import {StyleSheet, View} from 'react-native';
import {useCallback, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import {useFocusEffect} from '@react-navigation/native';
import {googleLogin} from '../redux/reducers/user/api';
import {useDispatch} from 'react-redux';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});
export default function GoogleButton() {
  const dispatch = useDispatch();

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }
    dispatch(googleLogin({idToken}));
  }
  useFocusEffect(
    useCallback(() => {
      GoogleSignin.revokeAccess();
    }, [])
  );

  return (
    <View style={styles.googleWrapper}>
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
        // disabled={isInProgress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  googleWrapper: {
    marginHorizontal: -4,
  },
  googleButton: {
    width: '100%',
  },
});
