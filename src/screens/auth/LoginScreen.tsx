import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, View, I18nManager } from 'react-native';
import apiManager from '../../data/index';
import { setItem } from '../../utils/syncStorage';
import CInput from '../../components/atoms/CInput';
import CText from '../../components/atoms/CText';
import CButton, { CButtonClear } from '../../components/atoms/CButton';
import CImage from '../../components/atoms/CImage';
import MarginTop from '../../components/atoms/MarginTop';
import CContainer from '../../components/atoms/CContainer';
import { showSuccessToast, showErrorToast } from '../../components/molecules/CToast';
import { firebaseErrorMessage } from '../../utils/firebaseError';
import * as CNavigator from '../../utils/CNavigator';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import CView from '../../components/atoms/CView';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../../components/molecules/LanguageToggle';

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogin = () => {
    // password validation: 6-20 chars, no spaces
    if (password.length < 6 || password.length > 20 || /\s/.test(password)) {
      showErrorToast('Password must be 6-20 characters with no spaces');
      return;
    }
    setLoading(true);
    apiManager
      .loginUser({ email, password })
      .then(async (credential: any) => {
        setLoading(false);
        const user = credential?.user;
        if (user) {
          try {
            const token = await user.getIdToken();
            await setItem('token', token);
          } catch (e) {
            console.log('Token retrieval failed', e);
          }
          showSuccessToast('Login successful');
          CNavigator.reset('SplashScreen');
        } else {
          showErrorToast('Login failed');
        }
      })
      .catch((err: any) => {
        setLoading(false);
        showErrorToast(firebaseErrorMessage(err));
      });
  };

  return (
    <CContainer isSafeArea={false} isLoading={loading} style={{ backgroundColor: 'transparent' }}>
      <ImageBackground
        source={CImage.appBanner}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="cover"
      >
          <View style={{ position: 'absolute', top: 40, right: 16, zIndex: 50 }}>
            <LanguageToggle />
          </View>
        <CView P24H W100 style={{ flex: 1, backgroundColor: 'rgba(25, 124, 181, 0.18)', justifyContent: 'center', alignItems: 'center' }}>
            <CImage.appLogoImage style={{ width: CFont.s(100), height: CFont.s(100), marginBottom: CFont.s(18), borderRadius: CFont.s(20), alignSelf: 'center', shadowColor: CColor.black, shadowOpacity: 0.08, shadowOffset: { width: 0, height: CFont.s(2) }, shadowRadius: CFont.s(6) }} resizeMode="contain" />
            <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: CFont.s(12), paddingVertical: CFont.s(6), borderRadius: CFont.s(12), marginBottom: CFont.s(8), shadowColor: CColor.black, shadowOpacity: 0.12, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6 }}>
              <CText.Title style={{ color: CColor.skyBlue700, textAlign: 'center' }}>{t('auth.login')}</CText.Title>
            </View>
            <MarginTop Top={16} />
            <CInput
              placeholder={t('auth.emailAddress')}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <CInput
              placeholder={t('auth.password')}
              value={password}
              onChangeText={setPassword}
              secureToggle
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            <CButton
              title={loading ? t('common.loggingIn') : t('common.login')}
              onPress={handleLogin}
              disabled={loading}
              style={{ width: '100%', marginBottom: CFont.s(12) }}
            />
            <CView W100 style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: CFont.s(8), marginBottom: CFont.s(8) }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => CNavigator.navigate('ForgotPasswordScreen')}
                style={{
                  backgroundColor: CColor.skyBlue50,
                  paddingVertical: CFont.s(8),
                  paddingHorizontal: CFont.s(15),
                  borderRadius: CFont.s(20),
                  shadowColor: CColor.black,
                  shadowOpacity: 0.08,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                }}
              >
                <CText.Generic style={{ color: CColor.skyBlue700, fontWeight: 'bold', fontSize: CFont.s(12), textAlign: 'center' }}>
                  {t('auth.forgotPassword')}
                </CText.Generic>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => CNavigator.navigate('CreateAccountScreen')}
                style={{
                  backgroundColor: CColor.skyBlue50,
                  paddingVertical: CFont.s(8),
                  paddingHorizontal: CFont.s(15),
                  borderRadius: CFont.s(20),
                  shadowColor: CColor.black,
                  shadowOpacity: 0.08,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                }}
              >
                <CText.Generic style={{ color: CColor.skyBlue700, fontWeight: 'bold', fontSize: CFont.s(12), textAlign: 'center' }}>
                  {t('auth.createAccount')}
                </CText.Generic>
              </TouchableOpacity>
            </CView>
          </CView>
      </ImageBackground>
    </CContainer>
  );
};

export default LoginScreen;
