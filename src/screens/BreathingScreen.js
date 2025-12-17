import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  View, Text, StyleSheet, Animated, 
  Platform, StatusBar, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AudioManager from '../utils/AudioManager';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BreathingScreen({ navigation, route }) {
  const config = useMemo(() => {
    return route.params || { inspire: 4, hold: 7, expire: 8 };
  }, [route.params]);

  const [phase, setPhase] = useState('prompt');
  const [timer, setTimer] = useState(0);
  const [cycle, setCycle] = useState(0);
  const scale = useRef(new Animated.Value(0.4)).current;
  const navigationRef = useRef(false);
  const audioLoaded = useRef(false);

  // Inicializar e carregar sons
  useEffect(() => {
    let mounted = true;

    const setupAudio = async () => {
      try {
        await AudioManager.initialize();

        // Carregar apenas inspire e expire
        await Promise.all([
          AudioManager.loadSound('inspire', require('../assets/sounds/inspire.mp3')),
          AudioManager.loadSound('expire', require('../assets/sounds/expire.mp3')),
        ]);

        if (mounted) {
          audioLoaded.current = true;
          console.log('✅ Sons carregados (inspire e expire)');
        }
      } catch (error) {
        console.error('❌ Erro ao configurar áudio:', error);
      }
    };

    setupAudio();

    return () => {
      mounted = false;
      AudioManager.unloadAll();
    };
  }, []);

  // Reproduzir sons quando mudar de fase
  useEffect(() => {
    if (!audioLoaded.current) return;

    if (phase === 'inspire') {
      AudioManager.playSound('inspire');
    } else if (phase === 'expire') {
      AudioManager.playSound('expire');
    }
  }, [phase]);

  const navigateToFeedback = useCallback(() => {
    if (!navigationRef.current) {
      navigationRef.current = true;
      AudioManager.unloadAll();
      setTimeout(() => {
        navigation.replace('Feedback');
      }, 0);
    }
  }, [navigation]);

  // ========== FASE PROMPT ==========
  useEffect(() => {
    if (phase === 'prompt') {
      const timeout = setTimeout(() => {
        setPhase('ready');
        setTimer(3);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // ========== FASE READY (Contagem regressiva 3, 2, 1) ==========
  useEffect(() => {
    if (phase === 'ready' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(interval);
            setPhase('inspire');
            return config.inspire;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, timer, config.inspire]);

  // ========== FASES INSPIRE, HOLD, EXPIRE ==========
  useEffect(() => {
    if (phase !== 'inspire' && phase !== 'hold' && phase !== 'expire') return;

    let timerInterval;

    // Inicia animação para INSPIRE e EXPIRE (HOLD não anima)
    if (phase === 'inspire') {
      Animated.timing(scale, {
        toValue: 2.0,
        duration: config.inspire * 1000,
        useNativeDriver: true,
      }).start();
    } else if (phase === 'expire') {
      Animated.timing(scale, {
        toValue: 0.4,
        duration: config.expire * 1000,
        useNativeDriver: true,
      }).start();
    }

    // Timer da fase atual
    timerInterval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(timerInterval);

          // Transições entre fases
          if (phase === 'inspire') {
            setPhase('hold');
            return config.hold;
          } else if (phase === 'hold') {
            setPhase('expire');
            return config.expire;
          } else if (phase === 'expire') {
            // Completou um ciclo
            if (cycle >= 2) {
              // Completou 3 ciclos, vai para feedback
              navigateToFeedback();
              return 0;
            } else {
              // Vai para o próximo ciclo
              setCycle(c => c + 1);
              setPhase('inspire');
              return config.inspire;
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      scale.stopAnimation();
    };
  }, [phase, cycle, config, scale, navigateToFeedback]);

  // ========== FUNÇÕES DE DISPLAY ==========
  const getDisplayTimer = () => {
    if (phase === 'inspire') {
      const elapsed = config.inspire - timer + 1;
      return elapsed.toString().padStart(2, '0');
    } else if (phase === 'expire') {
      const elapsed = config.expire - timer + 1;
      return elapsed.toString().padStart(2, '0');
    } else {
      return timer.toString().padStart(2, '0');
    }
  };

  const getPhaseText = () => {
    if (phase === 'prompt') return 'Pronto?';
    if (phase === 'ready') return 'Preparar...';
    if (phase === 'inspire') return 'INSPIRE';
    if (phase === 'hold') return 'SEGURE';
    if (phase === 'expire') return 'EXPIRE';
    return '';
  };

  // ========== RENDER ==========
  return (
    // 🔥 CORREÇÃO: Adiciona edges=['bottom'] para considerar barra de gestos
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#E0F7FA" barStyle="dark-content" translucent={false} />
      
      <LinearGradient colors={['#E0F7FA', '#B2EBF2']} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>Respirando</Text>

          {phase === 'prompt' ? (
            <View style={styles.promptContainer}>
              <Text style={styles.promptText}>Pronto?</Text>
            </View>
          ) : phase === 'ready' ? (
            <View style={styles.readyContainer}>
              <Text style={styles.readyTimer}>{timer}</Text>
              <Text style={styles.readyText}>Preparar...</Text>
            </View>
          ) : (
            <View style={styles.breathingContainer}>
              <Animated.View
                style={[
                  styles.circle,
                  { transform: [{ scale }] },
                ]}
              >
                <View style={styles.circleContent}>
                  <Text style={styles.circleTimer}>
                    {getDisplayTimer()}
                  </Text>
                  <Text style={styles.circlePhase}>{getPhaseText()}</Text>
                </View>
              </Animated.View>

              <Text style={styles.cycleText}>Ciclo {cycle + 1} de 3</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 🔥 CORREÇÃO: SafeAreaView com estilo explícito
  safeArea: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  gradient: { 
    flex: 1,
    justifyContent: 'space-between', // Garante que o banner fique no fundo
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
    marginBottom: 90,
  },
  promptContainer: {
    alignItems: 'center',
  },
  promptText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#26C6DA',
  },
  readyContainer: {
    alignItems: 'center',
  },
  readyTimer: {
    fontSize: 72,
    fontWeight: '300',
    color: '#26C6DA',
    marginBottom: 16,
  },
  readyText: {
    fontSize: 20,
    color: '#00838F',
    fontWeight: '400',
  },
  breathingContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#4DD0E1',
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleTimer: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  circlePhase: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    letterSpacing: 1,
  },
  cycleText: {
    fontSize: 18,
    color: '#546E7A',
    marginTop: 90,
  },
  
  // 🔥 CORREÇÃO: Wrapper para o banner
  adWrapper: {
    position: 'relative',
    width: '100%',
  },
  
  // 🔥 CORREÇÃO: Banner com padding bottom ajustado
  adContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12, // Reduzido, a barra de segurança vai abaixo
  },
  
  // 🔥 CORREÇÃO: Barra de segurança extra para Android
  androidSafetyBar: {
    height: Platform.OS === 'android' ? 24 : 0,
    backgroundColor: '#FFFFFF',
  },
  
  // Estilos antigos (mantidos para compatibilidade)
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