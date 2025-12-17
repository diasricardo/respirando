// utils/AudioManager.js
import { Audio } from 'expo-av';

class AudioManager {
  constructor() {
    this.sounds = {};
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      this.isInitialized = true;
      console.log('✅ AudioManager inicializado');
    } catch (error) {
      console.error('❌ Erro ao inicializar áudio:', error);
    }
  }

  async loadSound(key, source) {
    try {
      const { sound } = await Audio.Sound.createAsync(source);
      this.sounds[key] = sound;
      console.log(`✅ Som carregado: ${key}`);
      return sound;
    } catch (error) {
      console.error(`❌ Erro ao carregar som ${key}:`, error);
      return null;
    }
  }

  async playSound(key) {
    try {
      const sound = this.sounds[key];
      if (!sound) {
        console.warn(`⚠️ Som não encontrado: ${key}`);
        return;
      }

      await sound.setPositionAsync(0);
      await sound.playAsync();
      console.log(`🔊 Reproduzindo: ${key}`);
    } catch (error) {
      console.error(`❌ Erro ao reproduzir ${key}:`, error);
    }
  }

  async stopSound(key) {
    try {
      const sound = this.sounds[key];
      if (sound) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.error(`❌ Erro ao parar ${key}:`, error);
    }
  }

  async unloadAll() {
    try {
      for (const key in this.sounds) {
        const sound = this.sounds[key];
        if (sound) {
          await sound.unloadAsync();
        }
      }
      this.sounds = {};
      console.log('🗑️ Todos os sons descarregados');
    } catch (error) {
      console.error('❌ Erro ao descarregar sons:', error);
    }
  }
}

export default new AudioManager();