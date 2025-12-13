// components/BannerGrande.js - VERSÃO FINAL CORRIGIDA
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

// Use APENAS test ID ou seu ID real
const AD_UNIT_ID = __DEV__ 
  ? TestIds.INTERSTITIAL
  : Platform.OS === 'android'
    ? 'ca-app-pub-9858839660425512/5868303068'
    : 'ca-app-pub-9858839660425512/5241423581';

export default function BannerGrande({ onAdLoaded, onAdClosed, onAdError }) {
  const adRef = useRef(null);
  const hasLoaded = useRef(false);
  const hasShown = useRef(false);
  const hasClosed = useRef(false);

  useEffect(() => {
    console.log('🚀 [BannerGrande] Inicializando...');
    
    try {
      // 1. Cria o anúncio
      const ad = InterstitialAd.createForAdRequest(AD_UNIT_ID);
      adRef.current = ad;
      
      // 2. Usa APENAS UM método de listener para evitar duplicação
      const unsubscribe = ad.addAdEventsListener((event) => {
        console.log(`📢 [BannerGrande] Evento: ${event.type}`);
        
        // LOADED - Só processa uma vez
        if (event.type === 'loaded' && !hasLoaded.current) {
          console.log('✅ [BannerGrande] Carregado (primeira vez)');
          hasLoaded.current = true;
          onAdLoaded?.();
          
          // Mostra o anúncio APENAS se ainda não mostrou
          if (!hasShown.current) {
            hasShown.current = true;
            console.log('🔄 [BannerGrande] Mostrando anúncio...');
            
            // Pequeno delay para UI
            setTimeout(() => {
              ad.show()
                .then(() => {
                  console.log('✅ [BannerGrande] Anúncio em exibição');
                })
                .catch(err => {
                  console.log('❌ [BannerGrande] Erro ao mostrar:', err.message);
                  onAdError?.(err);
                });
            }, 300);
          }
        }
        
        // CLOSED - Só processa uma vez
        if (event.type === 'closed' && !hasClosed.current) {
          console.log('🔒 [BannerGrande] Fechado (primeira vez)');
          hasClosed.current = true;
          onAdClosed?.();
        }
        
        // ERROR
        if (event.type === 'error') {
          console.log('⚠️ [BannerGrande] Erro:', event.payload?.message);
          onAdError?.(event.payload);
        }
      });
      
      // 3. Carrega o anúncio
      console.log('📦 [BannerGrande] Carregando anúncio...');
      ad.load();
      
      // 4. Timeout de segurança
      const loadTimeout = setTimeout(() => {
        if (!hasLoaded.current) {
          console.log('⏰ [BannerGrande] Timeout de carregamento');
          onAdError?.(new Error('Anúncio não carregou em 10 segundos'));
        }
      }, 10000);
      
      return () => {
        console.log('🧹 [BannerGrande] Cleanup');
        clearTimeout(loadTimeout);
        unsubscribe?.();
      };
      
    } catch (error) {
      console.log('💥 [BannerGrande] Erro fatal:', error.message);
      onAdError?.(error);
    }
  }, [onAdLoaded, onAdClosed, onAdError]);

  return null;
}