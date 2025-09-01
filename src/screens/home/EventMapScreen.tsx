import React from 'react';
import { View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import CImage from '../../components/atoms/CImage';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CContainer from '../../components/atoms/CContainer';
import CView from '../../components/atoms/CView';
import CText from '../../components/atoms/CText';
import CFont from '../../utils/CFont';
import CColor from '../../utils/CColor';

const EventMapScreen = ({ route, navigation }: any) => {
  const { coords, event } = route.params || {};

  const latitude = coords?.latitude || 24.7136;
  const longitude = coords?.longitude || 46.6753;

  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <CContainer isSafeArea={false}>
      <View style={styles.fullscreen}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={event?.name}
            description={event?.info || event?.description}
          />
        </MapView>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <CImage.iconBack />
        </TouchableOpacity>

        <CView P10H style={styles.infoBox} pointerEvents="none">
          <CText.Title style={styles.infoTitle}>{event?.name}</CText.Title>
          {event?.dates?.start?.dateTime ? (
            <CText.Generic style={styles.infoDesc}>{new Date(event.dates.start.dateTime).toLocaleString()}</CText.Generic>
          ) : null}
          {event?._embedded?.venues?.[0]?.name ? (
            <CText.Generic style={styles.infoDesc}>{event._embedded.venues[0].name}</CText.Generic>
          ) : null}
        </CView>

        {Platform.OS === 'android' && (
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>Ensure Google Maps API key is set in AndroidManifest.xml</Text>
          </View>
        )}
      </View>
    </CContainer>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1, height: '100%', width: '100%' },
  infoBox: {
    position: 'absolute',
    top: CFont.s(56),
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    top: CFont.s(12),
    left: CFont.s(12),
    width: CFont.s(40),
    height: CFont.s(40),
    borderRadius: CFont.s(20),
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backText: { fontSize: CFont.s(20), color: CColor.darkGray },
  fullscreen: { flex: 1 },
  infoTitle: { fontSize: CFont.s(16), fontWeight: '700', marginBottom: 4 },
  infoDesc: { fontSize: CFont.s(13), color: '#444' },
  hintBox: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 6,
  },
  hintText: { color: '#fff', fontSize: 12, textAlign: 'center' },
});

export default EventMapScreen;
