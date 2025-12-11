import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function BreathingScreen({ navigation }) {
  const [phase, setPhase] = useState('ready');
  const [timer, setTimer] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    // Inicialização
    const timeout = setTimeout(() => {
      setPhase('inspire');
      setTimer(4);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (phase === 'ready') return;

    const phases = [
      { name: 'inspire', duration: 4, nextPhase: 'hold', scaleValue: 1.6 },
      { name: 'hold', duration: 7, nextPhase: 'expire', scaleValue: 1.6 },
      { name: 'expire', duration: 8, nextPhase: 'inspire', scaleValue: 0.8 },
    ];

    const currentPhase = phases.find(p => p.name === phase);

    // Animação do círculo
    Animated.timing(scale, {
      toValue: currentPhase.scaleValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            const currentIndex = phases.findIndex(p => p.name === phase);
            const current = phases[currentIndex];
            
            if (current.nextPhase === 'inspire' && cycle >= 2) {
              // Completou 3 ciclos
              navigation.replace('Feedback');
              return 0;
            }
            
            if (current.nextPhase === 'inspire') {
              setCycle(c => c + 1);
            }
            
            setPhase(current.nextPhase);
            const nextPhase = phases.find(p => p.name === current.nextPhase);
            return nextPhase.duration;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [phase, timer, cycle, navigation, scale]);

  const getPhaseText = () => {
    if (phase === 'inspire') return 'INSPIRE';
    if (phase === 'hold') return 'SEGURE';
    if (phase === 'expire') return 'EXPIRE';
    return '';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#E0F7FA', '#B2EBF2']} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>Respirando</Text>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {timer.toString().padStart(2, '0')}
            </Text>
            <Text style={styles.phaseText}>{getPhaseText()}</Text>
          </View>

          <Animated.View
            style={[
              styles.circle,
              { transform: [{ scale }] },
            ]}
          />

          <Text style={styles.cycleText}>Ciclo {cycle + 1} de 3</Text>
        </View>

        {/* Espaço de Publicidade */}
        <View style={styles.adContainer}>
          <Text style={styles.adLabel}>Publicidade</Text>
          <View style={styles.adContent}>
            <Text style={styles.adText}>Obtenha métodos avançados - Descubra mais</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: '#00BCD4',
    marginBottom: 40,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  timerText: {
    fontSize: 72,
    fontWeight: '300',
    color: '#26C6DA',
    marginBottom: 8,
  },
  phaseText: {
    fontSize: 20,
    color: '#00838F',
    fontWeight: '400',
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#4DD0E1',
    opacity: 0.8,
  },
  cycleText: {
    fontSize: 16,
    color: '#546E7A',
    marginTop: 40,
  },
  adContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 16,
  },
  adLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 8,
  },
  adContent: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  adText: {
    fontSize: 13,
    color: '#616161',
    textAlign: 'center',
  },
});