import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";
import CFont from "../../utils/CFont";
import CView from "./CView";
import CColor from "../../utils/CColor";

// Type definitions
interface CButtonBaseProps {
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<TextStyle>;
}

interface CButtonTextProps extends CButtonBaseProps {
  title: string;
  color?: string;
}

interface CButtonMainProps extends CButtonBaseProps {
  title: string;
  titlePrefix?: React.ReactNode;
  SM?: boolean;
}

export const CButtonClear = ({ disabled, title, onPress, color, style = {}, ...otherProps }: CButtonTextProps) => (
  <TouchableOpacity style={StyleSheet.flatten([styles.btnClear, style])} onPress={onPress} disabled={disabled} {...otherProps}>
    <Text style={{ ...styles.btnClearText, color }}>{title}</Text>
  </TouchableOpacity>
);
CButtonClear.defaultProps = {
  disabled: false,
  color: CColor.red,
};

export const CButtonCircle = ({ disabled, title, onPress, color, style = {}, ...otherProps }: CButtonTextProps) => (
  <TouchableOpacity style={StyleSheet.flatten([styles.buttonCircle, style])} onPress={onPress} disabled={disabled} {...otherProps}>
    <Text style={{ ...styles.btnClearText, color }}>{title}</Text>
  </TouchableOpacity>
);

const CButton = ({ disabled, title, titlePrefix, onPress, SM, style = {}, ...otherProps }: CButtonMainProps) => {
  let extBtnStyle = {};
  let extBtnTextStyle = {};
  if (SM) {
    extBtnStyle = { height: CFont.s(32), borderRadius: CFont.s(16), paddingHorizontal: CFont.s(10) };
    extBtnTextStyle = { ...styles.btnSMText };
  }
  if (disabled) {
    return (
      <View style={StyleSheet.flatten([styles.btnDisable, extBtnStyle, style])}>
        <Text style={{ ...styles.btnText, ...extBtnTextStyle }}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableHighlight style={StyleSheet.flatten([styles.btnActive, extBtnStyle, style])} onPress={onPress} activeOpacity={1} underlayColor={CColor.skyBlue700} {...otherProps}>
      <CView W100 FR AC JC>
        {titlePrefix ? <View style={{ marginRight: CFont.s(5) }}>{titlePrefix}</View> : null}
        <Text style={{ ...styles.btnText, ...extBtnTextStyle }}>{title}</Text>
      </CView>
    </TouchableHighlight>
  );
};

interface CFabButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  size?: number;
  testID?: string;
}

export const CFabButton = ({ onPress, icon, style, backgroundColor = CColor.skyBlue600, size = CFont.s(56), testID }: CFabButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        position: 'absolute',
        right: CFont.s(24),
        bottom: CFont.s(32),
        backgroundColor,
        borderRadius: size / 2,
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: CColor.black,
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        zIndex: 10,
      },
      style,
    ]}
    activeOpacity={0.8}
    testID={testID}
  >
    {icon}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnDisable: {
    backgroundColor: CColor.gray,
    width: "100%",
    height: CFont.s(42),
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginVertical: CFont.s(10),
    borderRadius: CFont.s(10),
    shadowOpacity: 0,
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: { width: 1, height: 13 },
    position: "relative",
    zIndex: 5,
  },
  btnActive: {
    backgroundColor: CColor.skyBlue600,
    width: "100%",
    height: CFont.s(42),
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginVertical: CFont.s(10),
    borderRadius: CFont.s(10),
    shadowColor: CColor.skyBlue900,
    shadowOpacity: 0.2,
    elevation: 2,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    position: "relative",
    zIndex: 5,
  },
  btnText: {
    color: CColor.white,
    textAlign: "center",
    fontFamily: CFont.RSB,
    lineHeight: CFont.s(18),
    fontSize: CFont.s(12),
  },
  btnSMText: {
    color: CColor.white,
    textAlign: "center",
    fontFamily: CFont.RSB,
    fontSize: CFont.s(11),
    lineHeight: CFont.s(17)
  },
  buttonCircle: {
    backgroundColor: "transparent",
    borderColor: CColor.red,
    borderWidth: CFont.s(2),
    width: "100%",
    height: CFont.s(42),
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: CFont.s(10),
    marginVertical: CFont.s(10),
    position: "relative",
    zIndex: 5,
  },
  btnClear: {
    backgroundColor: "transparent",
    width: "100%",
    height: CFont.s(42),
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginVertical: CFont.s(10),
    position: "relative",
    zIndex: 5,
  },
  btnClearText: {
    color: CColor.red,
    textAlign: "center",
    fontFamily: CFont.RSB,
    fontSize: CFont.s(12),
    lineHeight: CFont.s(17)
  },
});

export default CButton;
