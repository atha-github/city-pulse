import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../data/api/auth';
import CContainer from '../../components/atoms/CContainer';
import CHeader from '../../components/atoms/CHeader';
import { useTranslation } from 'react-i18next';
import CCView from '../../components/atoms/CCView';
import CScrollView from '../../components/atoms/CScrollView';
import CView from '../../components/atoms/CView';
import CImage from '../../components/atoms/CImage';
import CText from '../../components/atoms/CText';
import CButton from '../../components/atoms/CButton';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import { showSuccessToast, showErrorToast } from '../../components/molecules/CToast';
import { logout } from '../../utils/CHelper';

const MyProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const user = getCurrentUser();
      if (user) {
        setProfile({
          name: user.displayName || null,
          email: user.email || null,
          phone: user.phoneNumber || null,
          lastLogin: user.metadata?.lastSignInTime || null,
        });
      } else {
        setProfile(null);
      }
    } catch (e) {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    showSuccessToast(t('profile.logoutSuccess'));
  };


  return (
    <CContainer isLoading={loading}>
    <CHeader title={t('profile.title')} isMenuBar showLangToggle />
      <CCView>
        <CScrollView>
          <CView W100 AC JC>
            <CView style={{ alignItems: 'center', marginTop: CFont.s(32), marginBottom: CFont.s(16) }}>
              <CView style={{ position: 'relative' }}>
              <CImage.avatarPlaceholderPNG style={{ width: CFont.s(110), height: CFont.s(110), borderRadius: CFont.s(55), borderWidth: CFont.s(3), borderColor: CColor.skyBlue500 }} />
              </CView>
              <CText.Title style={{ marginTop: CFont.s(16) }}>{profile?.name || profile?.fullName || t('profile.greeting') || 'Dear User'}</CText.Title>

              {profile?.email ? (
                <CText.Generic style={{ color: CColor.gray, marginBottom: CFont.s(8) }}>{profile.email}</CText.Generic>
              ) : null}

              {profile?.phone ? (
                <CText.Generic>{`${t('profile.phone') || 'Phone'}: ${profile.phone}`}</CText.Generic>
              ) : null}

              {profile?.lastLogin ? (
                <CText.Generic>{`${t('profile.lastLogin') || 'Last Login'}: ${new Date(profile.lastLogin).toLocaleString()}`}</CText.Generic>
              ) : null}

            </CView>
            <CView style={{ width: '100%', marginTop: CFont.s(16) }}>
              <CButton title={t('profile.logout')} onPress={handleLogout} style={{ backgroundColor: CColor.red }} />
            </CView>
          </CView>
        </CScrollView>
      </CCView>
    </CContainer>
  );
};

export default MyProfileScreen;
