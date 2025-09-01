import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import favManager from '../../data/favorites';
import EventBus from '../../utils/EventBus';
import { useTranslation } from 'react-i18next';
import CContainer from '../../components/atoms/CContainer';
import CHeader from '../../components/atoms/CHeader';
import CCView from '../../components/atoms/CCView';
import CView from '../../components/atoms/CView';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import * as CNavigator from '../../utils/CNavigator';
import CText from '../../components/atoms/CText';
import CInput from '../../components/atoms/CInput';
import CButton, { CButtonClear } from '../../components/atoms/CButton';
import CImage from '../../components/atoms/CImage';
import { useNavigation } from '@react-navigation/native';
import { showErrorToast } from '../../components/molecules/CToast';
import MarginTop from '../../components/atoms/MarginTop';

const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const favs = await favManager.getFavorites();
      setUpcomingEvents(favs || []);
    })();
    const unsub = EventBus.subscribe('favorites:changed', async () => {
      const favs = await favManager.getFavorites();
      setUpcomingEvents(favs || []);
    });
    return () => unsub();
  }, []);

  return (
    <CContainer isLoading={loading}>
      <CHeader title={t('home.title')} isMenuBar showLangToggle />
      <CCView>
        <CView W100>
          <CView W100>
            <CText.subHeading>{t('home.searchHeading')}</CText.subHeading>
            <CView W100 style={{ marginTop: CFont.s(12), marginBottom: CFont.s(12) }}>
              <CInput
                label={t('home.keyword.label')}
                placeholder={t('home.keyword.placeholder')}
                value={keyword}
                onChangeText={setKeyword}
                containerStyle={{ marginBottom: CFont.s(8) }}
                inputStyle={{ borderWidth: 1.5, borderColor: CColor.skyBlue200, backgroundColor: CColor.white }}
              />
              <CInput
                label={t('home.city.label')}
                placeholder={t('home.city.placeholder')}
                value={city}
                onChangeText={setCity}
                containerStyle={{ marginBottom: CFont.s(8) }}
                inputStyle={{ borderWidth: 1.5, borderColor: CColor.skyBlue200, backgroundColor: CColor.white }}
              />
              <CButton
                title={t('home.searchButton')}
                onPress={() => {
                  // keyword is mandatory, city is optional
                  if (!keyword || keyword.trim().length === 0) {
                    showErrorToast(t('home.error.enterKeywordRequired'));
                    return;
                  }
                  CNavigator.navigate('EventScreen', { keyword: keyword || null, city: city || null });
                }}
              />
            </CView>

            <CView W100>
              <MarginTop Top={CFont.s(16)} />
              <CView W100 FR JS AC>
                <CText.subHeading>{t('home.favoritesHeading')}</CText.subHeading>
                {upcomingEvents.length > 0 && (
                  <CButtonClear
                    title={t('home.clearAll')}
                    onPress={async () => {
                      const ok = await favManager.clearFavorites();
                      if (!ok) showErrorToast(t('home.error.clearFailed'));
                    }}
                    style={{ paddingHorizontal: CFont.s(8), alignSelf: 'flex-end', width: undefined }}
                  />
                )}
              </CView>
            </CView>
          </CView>

          {/* Events list */}
          <FlatList
            data={upcomingEvents}
            keyExtractor={(item, index) => (item?.id ? String(item.id) : item?.addedAt ? String(item.addedAt) : String(index))}
            style={{ width: '100%' }}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('EventDetailScreen', { id: item.id })}>
                <CView P10H W100 FR style={styles.favCard}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={{ width: CFont.s(48), height: CFont.s(48), borderRadius: CFont.s(6), marginRight: CFont.s(10) }} resizeMode="cover" />
                  ) : (
                    <CImage.avatarPlaceholderPNG style={{ width: CFont.s(48), height: CFont.s(48), borderRadius: CFont.s(6), marginRight: CFont.s(10) }} />
                  )}
                  <View style={{ width: CFont.w - CFont.s(120) }}>
                    <CText.eventTitle numberOfLines={2} ellipsizeMode="tail" style={{ marginBottom: CFont.s(4) }}>{item.name || item.title || t('common.untitledEvent')}</CText.eventTitle>
                    <CText.Generic style={{ fontSize: CFont.s(14), color: CColor.gray }}>{item.date ? new Date(item.date).toLocaleString() : '-'}</CText.Generic>
                    {item.addedAt && (
                      <CText.eventDescription style={{ fontSize: CFont.s(12), color: CColor.gray, marginTop: CFont.s(4) }}>{t('common.added')} {new Date(item.addedAt).toLocaleString()}</CText.eventDescription>
                    )}
                  </View>
                </CView>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <CText.Generic style={{ color: CColor.gray, marginTop: CFont.s(8) }}>{t('home.noFavorites')}</CText.Generic>
            )}
          />
        </CView>
      </CCView>
    </CContainer>
  );
};

const styles = StyleSheet.create({
  favCard: {
    backgroundColor: CColor.lightGray,
    borderRadius: CFont.s(8),
    padding: CFont.s(10),
    marginBottom: CFont.s(10),
    shadowColor: CColor.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: CFont.s(1) },
    shadowRadius: CFont.s(2),
    alignItems: 'center'
  },
});

export default HomeScreen;


