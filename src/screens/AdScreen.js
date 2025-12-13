// AdScreen.js - COM PROTEÇÃO CONTRA DUPLICAÇÃO
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, ActivityIndicator, 
  TouchableOpacity, AppState 
} from 'react-native';
import BannerGrande from './BannerGrande';

export default function AdScreen({ navigation }) {
  const [status, setStatus] = useState('loading');
  const hasLeft = useRef(false);
  const adStartTime = useRef(0);
  const appState = useRef(AppState.currentState);
  const isProcessingClose = useRef(false);

  // 1. Função SEGURA para voltar à Home
  const goHome = () => {
    if (hasLeft.current) {
      console.log('⚠️ [AdScreen] Ignorando: já saiu');
      return;
    }
    
    hasLeft.current = true;
    console.log('🏠 [AdScreen] Indo para Home...');
    
    // Usa replace para não poder voltar
    setTimeout(() => {
      navigation.replace('Home');
    }, 300);
  };

  // 2. Detecta quando app volta (usuário fechou anúncio) - APENAS UMA VEZ
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log(`📱 [AdScreen] AppState: ${appState.current} → ${nextAppState}`);
      
      // Se estava "active" e voltou "active", pode ter fechado anúncio
      if (appState.current === 'active' && nextAppState === 'active') {
        const timeShowing = Date.now() - adStartTime.current;
        console.log(`⏱️ [AdScreen] Tempo de exibição: ${timeShowing}ms`);
        
        // Só processa se: está mostrando, passou mais de 1s, não está processando já
        if (status === 'showing' && timeShowing > 1000 && !isProcessingClose.current) {
          isProcessingClose.current = true;
          console.log('👀 [AdScreen] Detectado fechamento (AppState)');
          handleManualClose();
        }
      }
      
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [status]);

  // 3. Callbacks do BannerGrande
  const handleAdLoaded = () => {
    console.log('🎬 [AdScreen] Anúncio carregado');
    setStatus('showing');
    adStartTime.current = Date.now();
  };

  const handleAdClosed = () => {
    console.log('✅ [AdScreen] BannerGrande reportou fechamento');
    if (isProcessingClose.current) {
      console.log('⚠️ [AdScreen] Já estava processando fechamento');
      return;
    }
    isProcessingClose.current = true;
    setStatus('completed');
    setTimeout(goHome, 500);
  };

  const handleAdError = (error) => {
    console.log('⚠️ [AdScreen] Erro:', error?.message);
    setStatus('error');
    setTimeout(goHome, 800);
  };

  // 4. Fechamento manual (quando detectamos via AppState)
  const handleManualClose = () => {
    console.log('🔄 [AdScreen] Fechamento manual detectado');
    setStatus('completed');
    setTimeout(goHome, 500);
  };

  // 5. Timeout de segurança
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      console.log('⏰ [AdScreen] Timeout de segurança (30s)');
      if (!hasLeft.current) {
        setStatus('error');
        goHome();
      }
    }, 30000);

    return () => clearTimeout(safetyTimeout);
  }, []);

  return (
    <View style={styles.container}>
      <BannerGrande
        onAdLoaded={handleAdLoaded}
        onAdClosed={handleAdClosed}
        onAdError={handleAdError}
      />

      <View style={styles.content}>
        {status === 'loading' && (
          <>
            <ActivityIndicator size="large" color="#26C6DA" />
            <Text style={styles.text}>Carregando...</Text>
          </>
        )}
        
        {status === 'showing' && (
          <>
            <ActivityIndicator size="small" color="#26C6DA" />
            <Text style={styles.text}>Anúncio em exibição</Text>
            <Text style={styles.smallText}>Aguarde o término</Text>
            
            {/* BOTÃO DE EMERGÊNCIA - DESABILITADO após primeiro clique */}
            <TouchableOpacity 
              style={[styles.button, isProcessingClose.current && styles.buttonDisabled]}
              onPress={() => {
                if (!isProcessingClose.current) {
                  console.log('🆘 [AdScreen] Botão de emergência pressionado');
                  handleManualClose();
                }
              }}
              disabled={isProcessingClose.current}
            >
              <Text style={styles.buttonText}>
                {isProcessingClose.current ? 'Processando...' : 'Continuar'}
              </Text>
            </TouchableOpacity>
          </>
        )}
        
        {status === 'completed' && (
          <>
            <Text style={styles.bigText}>✓ Concluído!</Text>
            <Text style={styles.text}>Redirecionando...</Text>
          </>
        )}
        
        {status === 'error' && (
          <>
            <Text style={styles.errorText}>⚠️</Text>
            <Text style={styles.text}>Erro técnico</Text>
            <Text style={styles.smallText}>Voltando...</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#212121' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  text: { fontSize: 18, color: 'white', marginTop: 20, textAlign: 'center' },
  smallText: { fontSize: 14, color: '#aaa', marginTop: 10, textAlign: 'center' },
  bigText: { fontSize: 32, color: '#26C6DA', fontWeight: 'bold', marginBottom: 10 },
  errorText: { fontSize: 48, color: '#FF6B6B', marginBottom: 10 },
  button: { 
    marginTop: 30, 
    backgroundColor: '#26C6DA', 
    paddingHorizontal: 30, 
    paddingVertical: 12, 
    borderRadius: 25,
    minWidth: 150,
  },
  buttonDisabled: { 
    backgroundColor: '#666',
    opacity: 0.7,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});