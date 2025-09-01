import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import CImage from '../atoms/CImage';
import CContainer from '../atoms/CContainer';
import { logout } from '../../utils/CHelper';
import * as CNavigator from '../../utils/CNavigator';

const APP_VERSION = DeviceInfo.getVersion();

const CustomDrawerContent = (props: any) => {
  const { t } = useTranslation();
  const userName = t('profile.greeting') || 'Dear User';

  const menuItems = [
    { label: t('nav.home'), icon: <CImage.iconHome width={24} height={24} />, key: 'HomeScreen' },
    { label: t('nav.profile') || t('profile.title'), icon: <CImage.iconProfileRound width={24} height={24} />, key: 'MyProfileScreen' },
  ];

  const handleMenuPress = (key: string) => {
    if (props.navigation && typeof props.navigation.navigate === 'function') {
      CNavigator.navigate('Home', { screen: key });
    }
  };

  return (
    <CContainer>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <CImage.avatarPlaceholderPNG style={styles.avatar} />
          <Text style={styles.username}>{userName}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.key}
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: CFont.s(14), paddingHorizontal: CFont.s(20) }}
            onPress={() => handleMenuPress(item.key)}
            activeOpacity={0.7}
          >
            {item.icon}
            <Text style={{ fontSize: CFont.s(16), color: CColor.black, marginLeft: CFont.s(16), fontWeight: '500' }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.version}>{t('common.appVersion') || 'App Version'} {APP_VERSION}</Text>
        <TouchableOpacity style={styles.logoutRow} onPress={() => logout()} activeOpacity={0.7}>
          <CImage.iconLogout width={24} height={24} />
          <Text style={styles.logoutText}>{t('profile.logout') || t('common.logout') || 'Logout'}</Text>
        </TouchableOpacity>
      </View>
    </CContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: CColor.skyBlue500,
    width: '100%',
    alignSelf: 'stretch',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'stretch',
    paddingTop: CFont.s(48), // More padding for safe area
    paddingBottom: CFont.s(32),
    backgroundColor: CColor.skyBlue500,
    borderBottomWidth: 1,
    borderBottomColor: CColor.skyBlue100,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  avatar: {
    width: CFont.s(80),
    height: CFont.s(80),
    borderRadius: CFont.s(40),
    marginBottom: CFont.s(12),
    backgroundColor: CColor.white,
    borderWidth: 2,
    borderColor: CColor.white,
  },
  username: {
    fontSize: CFont.s(20),
    fontWeight: 'bold',
    color: CColor.white,
    marginBottom: CFont.s(8),
  },
  listContainer: {
    flex: 1,
    paddingTop: CFont.s(8),
    backgroundColor: CColor.white,
    width: '100%',
    alignSelf: 'stretch',
  },
  footer: {
    padding: CFont.s(16),
    borderTopWidth: 1,
    borderTopColor: CColor.skyBlue100,
    backgroundColor: CColor.white,
    width: '100%',
    alignSelf: 'stretch',
  },
  version: {
    fontSize: CFont.s(12),
    color: CColor.gray,
    textAlign: 'center',
    marginBottom: CFont.s(8),
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: CColor.red,
    fontWeight: 'bold',
    fontSize: CFont.s(16),
    marginLeft: CFont.s(8),
  },
});

export default CustomDrawerContent;
