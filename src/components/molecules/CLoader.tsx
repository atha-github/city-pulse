import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import CFont, {CScale} from '../../utils/CFont';
import CColor from '../../utils/CColor';


interface CLoaderProps {
  visible: boolean;
  transBg?: boolean;
  text?: string;
  size?: 'small' | 'large';
}

const CLoader: React.FC<CLoaderProps> = ({ visible, transBg = false, text = 'Loading...', size = 'large' }) => {
  if (!visible) return null;
  return (
    <View style={[styles.overlay, transBg && styles.transOverlay]}>
      <View style={styles.loaderBg}>
        <ActivityIndicator size={size} color="#0093e9" style={styles.spinner} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CFont.w,
    height: CFont.h,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  transOverlay: {
    backgroundColor: 'transparent',
  },
  loaderBg: {
    backgroundColor: CColor.white,
    borderRadius: 20,
    padding: 32,
    shadowColor: '#0093e9',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
    minHeight: 120,
  },
  spinner: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  text: {
    fontFamily: CFont.RSB,
    fontSize: CScale(15),
    color: CColor.black,
    marginTop: 24,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default CLoader;