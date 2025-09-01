import React from "react";
import { View, TouchableOpacity, StyleSheet, Keyboard, I18nManager, DevSettings } from "react-native";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CImage from "./CImage";
import CText from "./CText";
import CFont from "../../utils/CFont";
import CColor from "../../utils/CColor";
import LanguageToggle from '../molecules/LanguageToggle';

interface CHeaderProps {
  isMenuBar?: boolean;
  onBackPress?: () => void;
  title?: string;
  centerIcon?: React.ReactNode;
  titleCenter?: boolean;
  rightIcon?: React.ReactNode;
  onPressRightIcon?: () => void;
  showLangToggle?: boolean;
  withSafeArea?: boolean;
  hrBorder?: boolean;
  style?: object;
}

const CHeader: React.FC<CHeaderProps> = ({
  isMenuBar = false,
  onBackPress,
  title,
  centerIcon,
  titleCenter = true,
  rightIcon,
  onPressRightIcon,
  showLangToggle = false,
  withSafeArea = false,
  hrBorder = false,
  style = {}
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const onClickLeftIcon = () => {
    if (isMenuBar) {
      Keyboard.dismiss();
      navigation.dispatch(DrawerActions.openDrawer());
    } else if (typeof onBackPress !== "undefined") {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const onClickRightIcon = () => {
    if (typeof onPressRightIcon !== "undefined") {
      onPressRightIcon();
    }
  };

  const titleExtStyle = titleCenter
    ? [{ justifyContent: 'center' as const, alignItems: 'center' as const }]
    : [{ marginLeft: CFont.s(20) }];

  let hrBorderStyle = {};
  if (hrBorder) {
    hrBorderStyle = { borderTopWidth: 1, borderTopColor: CColor.red, borderBottomWidth: 1, borderBottomColor: CColor.red };
  }

  return (
    <View style={{ width: "100%", marginTop: withSafeArea ? insets.top : CFont.s(10) }}>
      <View style={{ ...styles.headerContainer, ...style, ...hrBorderStyle }}>
        <View style={{ width: CFont.w - CFont.s(60), ...styles.header }}>
          <View style={{ width: CFont.w - CFont.s(100), alignItems: "center", flexDirection: "row" }}>
            <TouchableOpacity onPress={onClickLeftIcon}>
              {isMenuBar ? <CImage.iconHumberger /> : <CImage.iconBack />}
            </TouchableOpacity>
            {centerIcon ? (
              <View style={{ width: CFont.w - CFont.s(115), alignItems: "center" }}>{centerIcon}</View>
            ) : (
              title ? (
                <View style={[{ width: CFont.w - CFont.s(120) }, ...titleExtStyle]}>
                  <CText.headerTitle>{title}</CText.headerTitle>
                </View>
              ) : null
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {rightIcon ? (
              <TouchableOpacity onPress={onClickRightIcon} style={{ marginRight: CFont.s(8) }}>{rightIcon}</TouchableOpacity>
            ) : null}
            {typeof showLangToggle !== 'undefined' && showLangToggle ? (
              <LanguageToggle />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: CFont.s(10),
    paddingBottom: CFont.s(10),
    zIndex: 5,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: CFont.s(30),
    marginRight: CFont.s(30),
  },
  langBtn: { paddingHorizontal: CFont.s(10), paddingVertical: CFont.s(6), borderRadius: 6, borderWidth: 1, marginLeft: CFont.s(8), borderColor: CColor.border },
  rtlBtn: { backgroundColor: CColor.white },
  langTxt: { fontSize: CFont.s(12), fontWeight: '600' },
});
