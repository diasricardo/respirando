import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// const BannerAd = ({ unitId, size, onAdLoaded, onAdFailedToLoad }) => null;
// const BannerAdSize = { ANCHORED_ADAPTIVE_BANNER: '',};
// const TestIds = { BANNER: '',};

import { View, Platform } from 'react-native'; 

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'android'
    ? 'ca-app-pub-9858839660425512/8027369023' // ID do Android
    : 'ca-app-pub-9858839660425512/6554505258'; // ID do iOS

export default function Banner() {
  return (
    <View >
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => console.log('Erro ao carregar AdMob:', error)}
        onAdLoaded={() => console.log('Banner carregado com sucesso')}
      />
    </View>
  );
}