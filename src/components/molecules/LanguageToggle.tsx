import React, { useEffect } from 'react';
import { TouchableOpacity, I18nManager, DevSettings } from 'react-native';
import { useTranslation } from 'react-i18next';
import CText from '../atoms/CText';
import CFont from '../../utils/CFont';
import CColor from '../../utils/CColor';
import { StyleSheet } from 'react-native';

const LanguageToggle: React.FC<{ small?: boolean }> = ({ small = true }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language || 'en';
    const shouldBeRTL = lang.startsWith('ar');
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      if (DevSettings && typeof DevSettings.reload === 'function') {
        DevSettings.reload();
      }
    }
  }, [i18n.language]);

  const toggleLanguage = async () => {
    const current = i18n.language || 'en';
    const next = current.startsWith('en') ? 'ar' : 'en';
    try {
      await i18n.changeLanguage(next);
    } catch (err) {
      console.error('Language change error:', err);
    }

    const shouldBeRTL = next.startsWith('ar');
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      if (DevSettings && typeof DevSettings.reload === 'function') {
        DevSettings.reload();
      }
    }
  };

  return (
    <TouchableOpacity onPress={toggleLanguage} accessibilityLabel="Toggle language" style={styles.langBtn}>
      <CText.Generic style={styles.langTxt}>{(i18n.language || 'en').slice(0, 2).toUpperCase()}</CText.Generic>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  langBtn: { paddingHorizontal: CFont.s(10), paddingVertical: CFont.s(6), borderRadius: 6, borderWidth: 1, marginLeft: CFont.s(8), borderColor: CColor.border },
  rtlBtn: { backgroundColor: CColor.white },
  langTxt: { fontSize: CFont.s(12), fontWeight: '600' },
});

export default LanguageToggle;
