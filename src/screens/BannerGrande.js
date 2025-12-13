// components/BannerGrande.js
import { useEffect, useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';

// Imports comentados para desenvolvimento
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
// const RewardedAd = {
//   createForAdRequest: () => ({
//     addAdEventListener: () => () => {},
//     load: () => {},
//     show: () => {},
//   })
// };
// const RewardedAdEventType = {
//   LOADED: 'loaded',
//   EARNED_REWARD: 'earned_reward',
//   CLOSED: 'closed',
//   ERROR: 'error',
// };
// const TestIds = { REWARDED: '' };

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : Platform.OS === 'android'
    ? 'ca-app-pub-9858839660425512/5868303068' // Seu ID Android
    : 'ca-app-pub-9858839660425512/5241423581'; // Seu ID iOS

export default function BannerGrande({ 
  onAdLoaded, 
  onAdEarnedReward, 
  onAdClosed, 
  onAdError 
}) {
  const [rewarded, setRewarded] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    // Quando o anúncio carrega
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('✅ Anúncio carregado');
        setLoaded(true);
        if (onAdLoaded) onAdLoaded();
      }
    );

    // Quando o usuário GANHA A RECOMPENSA (assistiu até o final)
    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log('🎁 Recompensa ganha!', reward);
        if (onAdEarnedReward) onAdEarnedReward(reward);
      }
    );

    // Quando o anúncio é fechado (pode ser antes ou depois da recompensa)
    const unsubscribeClosed = rewardedAd.addAdEventListener(
      RewardedAdEventType.CLOSED,
      () => {
        console.log('❌ Anúncio fechado');
        if (onAdClosed) onAdClosed();
      }
    );

    // Se der erro ao carregar
    const unsubscribeError = rewardedAd.addAdEventListener(
      RewardedAdEventType.ERROR,
      (error) => {
        console.log('⚠️ Erro no anúncio:', error);
        if (onAdError) onAdError(error);
      }
    );

    // Carrega o anúncio
    rewardedAd.load();
    setRewarded(rewardedAd);

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, [onAdLoaded, onAdEarnedReward, onAdClosed, onAdError]);

  // Mostra o anúncio assim que carregar
  useEffect(() => {
    if (loaded && rewarded) {
      console.log('📺 Exibindo anúncio...');
      rewarded.show();
    }
  }, [loaded, rewarded]);

  return null; // Componente invisível - o anúncio será exibido em tela cheia
}