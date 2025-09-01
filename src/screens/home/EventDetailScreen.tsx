import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, Image, Dimensions } from 'react-native';
import CText from '../../components/atoms/CText';
import { useTranslation } from 'react-i18next';
import CFont from '../../utils/CFont';
import apiManager from '../../data/index';
import CView from '../../components/atoms/CView';
import CScrollView from '../../components/atoms/CScrollView';
import CCView from '../../components/atoms/CCView';
import CContainer from '../../components/atoms/CContainer';
import CHeader from '../../components/atoms/CHeader';
import CButton from '../../components/atoms/CButton';
import { showSuccessToast, showErrorToast } from '../../components/molecules/CToast';
import CColor from '../../utils/CColor';
import { Linking } from 'react-native';
import favManager from '../../data/favorites';


const EventDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<ScrollView | null>(null);
  const width = Dimensions.get('window').width - 40; // padding in container
  const [isFav, setIsFav] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
   apiManager.getEventById(id).then((res: any) => {
        setEvent(res.data?.data || null);
        setLoading(false);
      }).catch(() => {
        showErrorToast('Failed to fetch event');
        setLoading(false);
      });
    (async () => {
      const fav = await favManager.isFavorite(id);
      setIsFav(!!fav);
    })();
  }, [id]);

  // auto scroll carousel
  useEffect(() => {
    if (!event) return;
    const images = event.images || [];
    if (!images.length) return;
    const timer = setInterval(() => {
      const next = (activeIndex + 1) % images.length;
      setActiveIndex(next);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ x: next * width, animated: true });
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [event, activeIndex]);

  

  if (!event) {
    return <View style={styles.container}><CText.Generic>{t('eventUI.notFound')}</CText.Generic></View>;
  }

  return (
    <CContainer isLoading={loading}>
      <CHeader title={t('event.details')} onBackPress={() => navigation.goBack()} showLangToggle />
      <CCView>
        <CScrollView>
          <CView W100>
            <View style={styles.container}>
              <CText.eventTitle style={styles.title}>{event.name || event.title}</CText.eventTitle>
              {event.images && event.images.length ? (
                <View style={{ width: '100%', alignItems: 'center', marginVertical: 12 }}>
                  <ScrollView
                    ref={(r) => { carouselRef.current = r; }}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                      const idx = Math.round(e.nativeEvent.contentOffset.x / width);
                      setActiveIndex(idx);
                    }}
                    style={{ width }}
                    contentContainerStyle={{ alignItems: 'center' }}
                  >
                    {event.images.map((img: any, i: number) => (
                      <Image key={i} source={{ uri: img.url }} style={{ width, height: 220, borderRadius: 12, marginHorizontal: 0 }} resizeMode="cover" />
                    ))}
                  </ScrollView>
                  <View style={styles.dotsRow}>
                    {event.images.map((_: any, i: number) => (
                      <View key={i} style={[styles.dot, activeIndex === i ? styles.dotActive : {}]} />
                    ))}
                  </View>
                </View>
              ) : null}

              <CText.Generic style={[styles.detail, { fontSize: CFont.s(16) }]}>Start: {event.dates?.start?.dateTime ? new Date(event.dates.start.dateTime).toLocaleString() : (event.dates?.start?.localDate || 'N/A')}</CText.Generic>
              <CText.Generic style={[styles.detail, { fontSize: CFont.s(16) }]}>Venue: {event._embedded?.venues?.[0]?.name || 'N/A'}</CText.Generic>

              {/* Additional info */}
              {event.classifications && event.classifications.length ? (
                <CText.Generic style={[styles.detail, { fontSize: CFont.s(16) }]}>Category: {event.classifications[0].segment?.name || ''} / {event.classifications[0].genre?.name || ''}</CText.Generic>
              ) : null}

              {event.priceRanges && event.priceRanges.length ? (
                <CText.Generic style={[styles.detail, { fontSize: CFont.s(16) }]}>Price: {event.priceRanges[0].min} - {event.priceRanges[0].max} {event.priceRanges[0].currency}</CText.Generic>
              ) : null}

              {event._embedded?.venues?.[0]?.postalCode ? (
                <CText.Generic style={[styles.detail, { fontSize: CFont.s(16) }]}>Postal Code: {event._embedded?.venues?.[0]?.postalCode}</CText.Generic>
              ) : null}

              {event.url ? (
                <CButton
                  title={t('eventUI.viewOnTicketmaster')}
                  onPress={async () => {
                    try {
                      const url = event.url;
                      const supported = await Linking.canOpenURL(url);
                      if (supported) {
                        await Linking.openURL(url);
                      } else {
                        showErrorToast(t('eventUI.error.cannotOpenLink'));
                      }
                    } catch (e) {
                      showErrorToast(t('eventUI.error.openFailed'));
                    }
                  }}
                  style={{ marginTop: 8 }}
                />
              ) : null}

              {event._embedded?.venues?.[0]?.location?.latitude && event._embedded?.venues?.[0]?.location?.longitude ? (
                <CButton
                  title={'Map View'}
                  onPress={() => {
                    const venue = event._embedded.venues[0];
                    const coords = {
                      latitude: parseFloat(venue.location.latitude),
                      longitude: parseFloat(venue.location.longitude),
                    };
                    navigation.navigate('EventMapScreen', { coords, event });
                  }}
                  style={{ marginTop: 8, backgroundColor: CColor.link }}
                />
              ) : null}

              <CText.Generic style={[styles.detail, { fontSize: CFont.s(16) }]}>Description: {event.info || event.pleaseNote || event.description || 'N/A'}</CText.Generic>

              <CButton
                title={isFav ? t('favs.remove') : t('favs.add')}
                onPress={async () => {
                  if (!event) return;
                  if (isFav) {
                    await favManager.removeFavorite(id);
                    setIsFav(false);
                    showSuccessToast(t('favs.removedSuccess'));
                  } else {
                    const res: any = await favManager.addFavorite(event);
                    setIsFav(true);
                    showSuccessToast(t('favs.addedSuccess'));
                    if (res && res.removed && res.removed.length) {
                      const names = res.removed.map((r: any) => r.name || r.id).join(', ');
                      showErrorToast(t('favs.removedOlder', { names }));
                    }
                  }
                }}
                style={{ marginTop: 24, backgroundColor: isFav ? CColor.borderDark || CColor.gray : CColor.red }}
              />
            </View>
          </CView>
        </CScrollView>
      </CCView>
      </CContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, width: '100%' },
  title: { fontSize: CFont.s(28), fontWeight: 'bold', marginBottom: 16 },
  detail: { fontSize: CFont.s(16), marginBottom: 8 },
  deleteButton: { backgroundColor: CColor.red, padding: 14, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 24 },
  deleteButtonText: { color: CColor.white, fontWeight: 'bold', fontSize: CFont.s(16) },
  link: { color: CColor.link, marginTop: 16 },
  dotsRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: CColor.border, marginHorizontal: 4 },
  dotActive: { backgroundColor: CColor.darkGray },
});

export default EventDetailScreen;
