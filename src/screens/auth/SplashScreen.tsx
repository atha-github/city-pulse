import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Animated, Easing } from 'react-native';
import { getItem } from '../../utils/syncStorage';
import * as CNavigator from '../../utils/CNavigator';
import CImage from '../../components/atoms/CImage';


const SplashScreen = ({ navigation }: any) => {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const batchAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(batchAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();

    const checkAuth = async () => {
      const token = await getItem('token');
      setTimeout(() => {
        if (token) {
          CNavigator.navigate('Dashboard');
        } else {
          CNavigator.navigate('LoginScreen');
        }
      }, 1600);
    };
    checkAuth();
  }, [navigation, logoAnim, batchAnim]);

  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <Animated.View
          style={{
            opacity: logoAnim,
            transform: [
              {
                scale: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1],
                }),
              },
            ],
          }}
        >
          <Image
            source={CImage.applogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <ActivityIndicator size="large" color="#0093E9" style={{ marginTop: 40 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  batch: {
    width: 120,
    height: 60,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
});

export default SplashScreen;
