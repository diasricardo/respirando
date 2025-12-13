import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import BreathingScreen from './src/screens/BreathingScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import AdScreen from './src/screens/AdScreen';
import AdOfferScreen from './src/screens/AdOfferScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Breathing" component={BreathingScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="AdScreen" component={AdScreen} />
        <Stack.Screen name="AdOfferScreen" component={AdOfferScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
