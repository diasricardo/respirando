import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import BannerGrande from './BannerGrande';

export default function AdScreen({ navigation }) {
  const [adStatus, setAdStatus] = useState('loading'); // loading, showing, completed
  const hasNavigated = useRef(false);

  const handleAdLoaded = () => {
    console.log('Anúncio carregado e sendo exibido');
    setAdStatus('showing');
  };

  const handleAdEarnedReward = () => {
    console.log('Usuário assistiu o anúncio completo e ganhou recompensa!');
    setAdStatus('completed');
    // Navega imediatamente após ganhar recompensa
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      setTimeout(() => navigation.navigate('Home'), 500);
    }
  };

  const handleAdClosed = () => {
    console.log('Anúncio foi fechado');
    // Só navega se ainda não navegou (caso o usuário feche antes de completar)
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      setTimeout(() => navigation.navigate('Home'), 300);
    }
  };

  const handleAdError = (error) => {
    console.log('Erro ao carregar anúncio:', error);
    // Se der erro, volta para home
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      setTimeout(() => navigation.navigate('Home'), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <BannerGrande
        onAdLoaded={handleAdLoaded}
        onAdEarnedReward={handleAdEarnedReward}
        onAdClosed={handleAdClosed}
        onAdError={handleAdError}
      />

      {/* Tela de loading/aguardando */}
      <View style={styles.content}>
        {adStatus === 'loading' && (
          <>
            <ActivityIndicator size="large" color="#26C6DA" />
            <Text style={styles.statusText}>Carregando anúncio...</Text>
          </>
        )}

        {adStatus === 'showing' && (
          <Text style={styles.statusText}>Assistindo anúncio...</Text>
        )}

        {adStatus === 'completed' && (
          <>
            <Text style={styles.completedText}>✓ Completo!</Text>
            <Text style={styles.statusText}>Obrigado por assistir!</Text>
          </>
        )}

        <Text style={styles.thankYou}>
          Obrigado por apoiar o Respirando!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  statusText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 20,
  },
  completedText: {
    fontSize: 32,
    color: '#26C6DA',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  thankYou: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 32,
    textAlign: 'center',
  },
});