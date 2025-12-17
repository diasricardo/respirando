import React from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, 
  Platform, StatusBar, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Banner from './Banner';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AdOfferScreen({ navigation }) {
  return (
    // 🔥 CORREÇÃO: Adiciona edges=['bottom'] para considerar barra de gestos
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#E0F7FA" barStyle="dark-content" translucent={false} />
      
      <LinearGradient colors={['#E0F7FA', '#B2EBF2']} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>Respirando</Text>

          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💙</Text>
          </View>

          <Text style={styles.heading}>Que ótimo!</Text>

          <Text style={styles.message}>
            Gostaria de ajudar no desenvolvimento do projeto assistindo a uma publicidade de 20 segundos?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonYes}
              onPress={() => navigation.navigate('AdScreen')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonYesText}>Sim, assistir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonNo}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonNoText}>Não, obrigado</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.tip}>
            Sua colaboração nos ajuda a manter o app gratuito
          </Text>
          
          {/* 🔥 CORREÇÃO: Spacer para garantir que o banner não cubra conteúdo */}
          <View style={styles.bottomSpacer} />
        </View>

        {/* 🔥 CORREÇÃO: Banner com wrapper e barra de segurança */}
        <View style={styles.adWrapper}>
          <View style={styles.adContainer}>
            <Banner />
          </View>
          {/* Barra de segurança extra para Android */}
          {Platform.OS === 'android' && <View style={styles.androidSafetyBar} />}
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
    justifyContent: 'space-between', // Garante espaço entre conteúdo e banner
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(38, 198, 218, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: '300',
    color: '#37474F',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#546E7A',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: 280,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    maxWidth: 300,
  },
  buttonYes: {
    flex: 1,
    backgroundColor: '#26C6DA',
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonYesText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
  },
  buttonNo: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#26C6DA',
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonNoText: {
    color: '#00838F',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
  },
  tip: {
    fontSize: 12,
    color: '#78909C',
    textAlign: 'center',
    marginTop: 40,
  },
  
  // 🔥 CORREÇÃO: Spacer dinâmico
  bottomSpacer: {
    height: Platform.OS === 'ios' ? 20 : 30,
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
  adText: {
    fontSize: 13,
    color: '#616161',
    textAlign: 'center',
  },
});