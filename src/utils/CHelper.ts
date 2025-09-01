import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CNavigator from './CNavigator';

export async function logout() {
  try {
    await AsyncStorage.removeItem('token');
    CNavigator.reset('LoginScreen');
  } catch (e) {
    console.error('Logout error:', e);
  }
}
