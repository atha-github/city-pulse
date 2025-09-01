import React, { useState } from 'react';
import { ImageBackground, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, I18nManager } from 'react-native';
import apiManager from '../../data/index';
import { setItem } from '../../utils/syncStorage';
import CInput from '../../components/atoms/CInput';
import * as CNavigator from '../../utils/CNavigator';
import { showSuccessToast, showErrorToast } from '../../components/molecules/CToast';
import { firebaseErrorMessage } from '../../utils/firebaseError';
import CButton, { CButtonClear } from '../../components/atoms/CButton';
import CText from '../../components/atoms/CText';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../../components/molecules/LanguageToggle';
import CContainer from '../../components/atoms/CContainer';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import CImage from '../../components/atoms/CImage';


const CreateAccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      showErrorToast('All fields are required');
      return;
    }
    if (password.length < 6 || password.length > 20 || /\s/.test(password)) {
      showErrorToast('Password must be 6-20 characters with no spaces');
      return;
    }
    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match');
      return;
    }
    setLoading(true);
    apiManager
      .registerUser({ email, password })
      .then(async (credential: any) => {
        setLoading(false);
        const user = credential?.user;
        if (user) {
          try {
            const token = await user.getIdToken();
            await setItem('token', token);
          } catch (e) {}
          showSuccessToast('Account created!');
          CNavigator.navigate('LoginScreen');
        } else {
          showErrorToast('Registration failed');
        }
      })
      .catch((err: any) => {
        setLoading(false);
        showErrorToast(firebaseErrorMessage(err));
      });
  };

  return (
    <CContainer isLoading={loading} style={{ backgroundColor: 'transparent' }}>
      <ImageBackground
        source={CImage.appBanner}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="cover"
      >
          <View style={{ position: 'absolute', top: 40, right: 16, zIndex: 50 }}>
            <LanguageToggle />
          </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} keyboardShouldPersistTaps="handled">
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', minHeight: 600 }}>
              <View
                style={{
                  width: '92%',
                  maxWidth: 400,
                  backgroundColor: 'rgba(255,255,255,0.98)',
                  borderRadius: CFont.s(24),
                  paddingVertical: CFont.s(24),
                  paddingHorizontal: CFont.s(20),
                  shadowColor: CColor.black,
                  shadowOpacity: 0.14,
                  shadowOffset: { width: 0, height: 6 },
                  shadowRadius: 18,
                  elevation: 10,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: CColor.skyBlue100,
                }}
              >
                <View style={{ backgroundColor: CColor.skyBlue100, borderRadius: 100, padding: 10, marginBottom: CFont.s(10), shadowColor: CColor.black, shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6 }}>
                  <CImage.appLogoImage style={{ width: CFont.s(60), height: CFont.s(60), borderRadius: CFont.s(30), alignSelf: 'center' }} resizeMode="contain" />
                </View>
                <CText.Title style={{ marginBottom: CFont.s(16), color: CColor.skyBlue700, fontSize: CFont.s(26), fontWeight: 'bold', textAlign: 'center' }}>{t('common.register')}</CText.Title>
                <CInput 
                placeholder={t('auth.emailAddress')} 
                value={email} 
                onChangeText={setEmail} 
                autoCapitalize="none" 
                keyboardType="email-address" 
                style={{ marginBottom: CFont.s(12), color: CColor.gray, fontWeight: '500' }} 
                inputStyle={{ color: CColor.gray, fontWeight: '500' }}  
                />
                <CInput 
                placeholder={t('auth.password')} 
                value={password} 
                onChangeText={setPassword} 
                secureToggle 
                style={{ marginBottom: CFont.s(12), color: CColor.gray, fontWeight: '500' }} 
                inputStyle={{ color: CColor.gray, fontWeight: '500' }} 
                textAlign={I18nManager.isRTL ? 'right' : 'left'} 
                />
                <CInput 
                placeholder={t('auth.confirmPassword') || 'Confirm Password'} 
                value={confirmPassword} 
                onChangeText={setConfirmPassword} 
                secureToggle 
                style={{ marginBottom: CFont.s(12), color: CColor.gray, fontWeight: '500' }} 
                inputStyle={{ color: CColor.gray, fontWeight: '500' }} 
                textAlign={I18nManager.isRTL ? 'right' : 'left'} 
                />
                <CButton
                  title={loading ? t('common.registering') : t('common.register')}
                  onPress={handleRegister}
                  disabled={loading}
                  style={{ width: '100%', marginBottom: CFont.s(12), borderRadius: CFont.s(14), fontWeight: 'bold', fontSize: CFont.s(18), shadowColor: CColor.skyBlue700, shadowOpacity: 0.18, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 }}
                />
                <TouchableOpacity activeOpacity={0.7} onPress={() => CNavigator.navigate('LoginScreen')} style={{ alignSelf: 'center', marginTop: CFont.s(8) }}>
                  <CText.Generic style={{ color: CColor.link, fontWeight: 'bold', fontSize: CFont.s(16), textAlign: 'center', textDecorationLine: 'underline' }}>
                    {t('auth.alreadyHaveAccount') || 'Already have an account? Login'}
                  </CText.Generic>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </CContainer>
  );
};

export default CreateAccountScreen;
