import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import CImage from './CImage';

interface CInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: object;
  inputStyle?: object;
  secureToggle?: boolean;
}

const CInput: React.FC<CInputProps> = ({ label, error, containerStyle, inputStyle, secureToggle, ...props }) => {
  const [secure, setSecure] = useState<boolean>(props.secureTextEntry ?? false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <TextInput
          style={[styles.input, inputStyle, secureToggle ? { paddingRight: 44 } : null, error ? styles.inputError : null]}
          placeholderTextColor={CColor.gray}
          secureTextEntry={secure}
          {...props}
        />
        {secureToggle && (
          <TouchableOpacity style={styles.eye} onPress={() => setSecure(s => !s)}>
            {secure ? <CImage.iconEye width={20} height={20} /> : <CImage.iconEyeOff width={20} height={20} />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: CColor.darkGray,
    marginBottom: 6,
    fontFamily: CFont.RSB,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: CColor.skyBlue200,
    borderRadius: 8,
    padding: 12,
    backgroundColor: CColor.white,
    fontSize: 15,
    color: CColor.darkGray,
    fontFamily: CFont.RR,
  },
  eye: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  inputError: {
    borderColor: CColor.red,
  },
  error: {
    color: CColor.red,
    fontSize: 13,
    marginTop: 4,
    fontFamily: CFont.RR,
  },
});

export default CInput;
