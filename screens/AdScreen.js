import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdScreen({ navigation }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => navigation.navigate('Home'), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LinearGradient
          colors={['#9C27B0', '#E91E63']}
          style={styles.adBox}
        >
          <Text style={styles.adTitle}>Anúncio</Text>
          <Text style={styles.adSubtitle}>Conteúdo publicitário</Text>
        </LinearGradient>

        <View style={styles.timerBox}>
          <Text style={styles.timerText}>
            Fechando em <Text style={styles.timerHighlight}>{timer}s</Text>
          </Text>
        </View>

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
  adBox: {
    width: 280,
    height: 180,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  adTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  adSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  timerBox: {
    backgroundColor: '#424242',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  timerText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  timerHighlight: {
    fontWeight: 'bold',
    color: '#26C6DA',
  },
  thankYou: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 32,
  },
});