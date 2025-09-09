import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import apiManager from '../../data/index';
import { useTranslation } from 'react-i18next';
import CContainer from '../../components/atoms/CContainer';
import CHeader from '../../components/atoms/CHeader';
import CCView from '../../components/atoms/CCView';
import CView from '../../components/atoms/CView';
import CImage from '../../components/atoms/CImage';
import CColor from '../../utils/CColor';
import CFont from '../../utils/CFont';
import CText from '../../components/atoms/CText';
import { showErrorToast, showSuccessToast } from '../../components/molecules/CToast';

const EventScreen = ({ navigation, route }: any) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const p = route?.params;
    if (!p || !(p.keyword || p.city)) {
      navigation.navigate('Home');
      return;
    }
    setPage(0);
    setHasMore(true);
    setEvents([]);
    const q = p.keyword || null;
    const city = p.city || null;
    const params: any = { size };
    if (q) params.keyword = q;
    if (city) params.city = city;
    fetchEventsWithParams({ ...params, page: 0 });
  }, [route?.params]);


  const fetchEventsWithParams = (params: any, pageToFetch = 0) => {
    if (pageToFetch === 0) setLoading(true);
    else setLoadingMore(true);

    apiManager
      .searchEvents({ ...params, page: pageToFetch })
      .then((res: any) => {
        const items = res.data?.data || [];
        //console.log(allIndexItem.length);

        //const items = allIndexItem.filter((item, index) => index % 2 === 0);

        const pageMeta = res.data?.page || null;

        const prevCount = pageToFetch === 0 ? 0 : events.length;

        if (pageToFetch === 0) setEvents(items);
        else setEvents(prev => [...prev, ...items]);

        if (pageMeta && typeof pageMeta.totalElements === 'number') {
          setTotalResults(pageMeta.totalElements);
        } else {
          setTotalResults(prevCount + items.length);
        }

        if (pageMeta && typeof pageMeta.totalPages === 'number') {
          setHasMore(pageToFetch < (pageMeta.totalPages - 1));
        } else {
          setHasMore(items.length === size);
        }

        setLoading(false);
        setLoadingMore(false);
      })
      .catch(() => {
        showErrorToast('Failed to fetch events');
        setLoading(false);
        setLoadingMore(false);
      });
  };

  const loadMore = () => {
    if (loadingMore || loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    const p = route?.params;
    const q = p?.keyword || null;
    const city = p?.city || null;
    const params: any = { size };
    if (q) params.keyword = q;
    if (city) params.city = city;
    fetchEventsWithParams(params, next);
  };

  const renderItem = ({ item }: any) => {
    const imageUrl = item.images && item.images.length ? item.images[0].url : null;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('EventDetailScreen', { id: item.id || item._id })}
        activeOpacity={0.8}
        style={{ width: '100%', marginBottom: CFont.s(12) }}
      >
        <CView P10H FR AC W100 style={styles.item}>
          <CView style={{ width: CFont.s(80), height: CFont.s(80), borderRadius: CFont.s(8), overflow: 'hidden', marginRight: CFont.s(12) }}>
            {imageUrl ? (
              <CImage.customImage style={{ width: '100%', height: '100%' }} source={{ uri: imageUrl }} />
            ) : (
              <CImage.appLogoImage style={{ width: '100%', height: '100%' }} />
            )}
          </CView>

          <CView style={{ flex: 1 }}>
            <CText.eventTitle>{item.name || item.title}</CText.eventTitle>
            <CText.Generic style={styles.date}>Start: {item.dates?.start?.dateTime ? new Date(item.dates.start.dateTime).toLocaleString() : (item.dates?.start?.localDate || 'N/A')}</CText.Generic>
            <CText.eventDescription style={styles.desc} numberOfLines={2} ellipsizeMode="tail">{item.info || item.pleaseNote || item.description || ''}</CText.eventDescription>
          </CView>
        </CView>
      </TouchableOpacity>
    );
  };

  return (
    <CContainer isLoading={loading}>
    <CHeader title={t('event.title')} isMenuBar={!(route?.params && (route.params.keyword || route.params.city))} onBackPress={() => navigation.goBack()} showLangToggle />
      <CCView>
          <CView W100>
              {route?.params && (route.params.keyword || route.params.city) ? (
                <CView P10H W100 style={{ backgroundColor: CColor.lightGray, padding: CFont.s(10), borderRadius: CFont.s(8), marginBottom: CFont.s(12) }}>
                  <CText.smDescription>
                      {t('eventUI.showingFor', { keyword: route.params.keyword ? `"${route.params.keyword}"` : '', inCity: route.params.keyword && route.params.city ? ' in ' + route.params.city : (route.params.city || '') })}
                      {totalResults !== null ? ` (${totalResults})` : ''}
                  </CText.smDescription>
                </CView>
              ) : null}
            <FlatList
              data={events}
              renderItem={renderItem}
              keyExtractor={(item: any, index: number) => item.id || item._id || index.toString()}
              contentContainerStyle={{ paddingBottom: CFont.s(20) }}
              ListEmptyComponent={<CText.Generic>{loading ? 'Loading...' : 'No events found.'}</CText.Generic>}
              style={{ width: '100%', marginBottom: CFont.s(50) }}
              onEndReached={loadMore}
              onEndReachedThreshold={0.6}
              ListFooterComponent={loadingMore ? <CText.Generic>Loading more...</CText.Generic> : null}
            />
          </CView>
      </CCView>
    </CContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: CFont.s(20), backgroundColor: CColor.white },
  header: { fontSize: CFont.s(28), fontWeight: 'bold', marginBottom: CFont.s(16) },
  item: { backgroundColor: CColor.lightGray, padding: CFont.s(16), borderRadius: CFont.s(8), marginBottom: CFont.s(12)},
  title: { fontWeight: 'bold' },
  date: { color: CColor.gray, marginTop: CFont.s(4) },
  desc: { marginTop: CFont.s(2) },
});

export default EventScreen;
