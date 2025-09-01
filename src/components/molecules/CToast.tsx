import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast, InfoToast, ToastConfig } from 'react-native-toast-message';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import CImage from '../atoms/CImage';


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 48,
    elevation: 5,
    backgroundColor: CColor.white,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    marginVertical: 8,
  },
  contentContainer: {
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleText: {
    color: CColor.black,
    fontFamily: CFont.RSB,
    fontSize: 16,
  },
  titleTextSmall: {
    color: CColor.gray,
    fontFamily: CFont.RR,
    fontSize: 13,
  },
});


const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.container}
      renderLeadingIcon={() => <CImage.iconSuccess />}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.titleText}
      text2Style={styles.titleTextSmall}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={[styles.container, { backgroundColor: CColor.red }]}
      renderLeadingIcon={() => <CImage.iconError />}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.titleText, { color: CColor.white }]}
      text2Style={[styles.titleTextSmall, { color: CColor.white }]}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      style={styles.container}
      renderLeadingIcon={() => <CImage.iconInfo />}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.titleText}
      text2Style={styles.titleTextSmall}
    />
  ),
};

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', position: 'bottom' | 'top' = 'bottom') => {
  Toast.show({ type, text1: message, position });
}
export const showSuccessToast = (message: string, position: 'bottom' | 'top' = 'bottom') => {
  Toast.show({ type: 'success', text1: message, position });
}
export const showInfoToast = (message: string, position: 'bottom' | 'top' = 'bottom') => {
  Toast.show({ type: 'info', text1: message, position });
}
export const showErrorToast = (message: string, position: 'bottom' | 'top' = 'bottom') => {
  Toast.show({ type: 'error', text1: message, position });
}

const CToast = React.memo((props: any) => <Toast {...props} config={toastConfig} />);

export default CToast;
