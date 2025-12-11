import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdOfferScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#E0F7FA', '#B2EBF2']} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>Respirando</Text>

          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💙</Text>
          </View>

          <Text style={styles.heading}>Que ótimo!</Text>

          <Text style={styles.message}>
            Gostaria de ajudar no desenvolvimento do projeto assistindo a uma publicidade de 30 segundos?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonYes}
              onPress={() => navigation.navigate('Ad')}
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
        </View>

        {/* Espaço de Publicidade */}
        <View style={styles.adContainer}>
          <Text style={styles.adLabel}>Publicidade</Text>
          <View style={styles.adContent}>
            <Text style={styles.adText}>Mantenha sua mente saudável - Saiba mais</Text>
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