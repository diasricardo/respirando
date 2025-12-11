import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#E0F7FA', '#B2EBF2']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Respirando</Text>

          <View style={styles.iconContainer}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>4-7-8</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>Técnica de Respiração</Text>
          <Text style={styles.description}>4s inspire • 7s segure • 8s expire</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Breathing')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Respirar</Text>
          </TouchableOpacity>
        </View>

        {/* Espaço de Publicidade */}
        <View style={styles.adContainer}>
          <Text style={styles.adLabel}>Publicidade</Text>
          <View style={styles.adContent}>
            <Text style={styles.adText}>App de Meditação Guiada - Experimente Agora</Text>
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
    fontSize: 36,
    fontWeight: '300',
    color: '#00BCD4',
    marginBottom: 60,
  },
  iconContainer: {
    marginBottom: 40,
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#80DEEA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#26C6DA',
  },
  circleText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#006064',
  },
  subtitle: {
    fontSize: 20,
    color: '#546E7A',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#78909C',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#00BCD4',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '100%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
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