import React, { useState } from 'react';
import apiManager from '../../data/index';
import { firebaseErrorMessage } from '../../utils/firebaseError';
import CInput from '../../components/atoms/CInput';
import * as CNavigator from '../../utils/CNavigator';
import { showSuccessToast, showErrorToast } from '../../components/molecules/CToast';
import CButton, { CButtonClear } from '../../components/atoms/CButton';
import CView from '../../components/atoms/CView';
import CContainer from '../../components/atoms/CContainer';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import CHeader from '../../components/atoms/CHeader';
import { useTranslation } from 'react-i18next';
import CCView from '../../components/atoms/CCView';
import CScrollView from '../../components/atoms/CScrollView';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleForgotPassword = () => {
    if (!email) {
      showErrorToast('Please enter your email');
      return;
    }
    setLoading(true);
    apiManager
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);
        showSuccessToast('Password reset link sent to your email');
        CNavigator.navigate('LoginScreen');
      })
      .catch((err: any) => {
        setLoading(false);
        showErrorToast(firebaseErrorMessage(err));
      });
  };

  return (
    <CContainer isLoading={loading}>
      <CHeader title={t('auth.forgotPassword')} onBackPress={() => navigation.goBack()} showLangToggle />
        <CCView isForm>
          <CScrollView>
            <CView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: CFont.s(20) }}>
              <CInput
                placeholder={t('auth.emailAddress')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <CButton title={loading ? t('auth.sending') || 'Sending...' : t('auth.sendReset') || 'Send Reset Link'} onPress={handleForgotPassword} disabled={loading} style={{ width: '100%', marginBottom: CFont.s(12) }} />
              <CButtonClear title={t('common.backToLogin')} onPress={() => CNavigator.navigate('LoginScreen')} color={CColor.link} style={{ alignSelf: 'center', marginTop: CFont.s(8) }} />
            </CView>
          </CScrollView>
      </CCView>
    </CContainer>
  );
};

export default ForgotPasswordScreen;
