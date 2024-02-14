import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import InstructionsScreen from './app/screens/InstructionsScreen';
import LevelsScreen from './app/screens/LevelsScreen';
import Configuration from './app/screens/Configuration';

const Stack = createStackNavigator();

const App = () => {
  const [soundTapObject, setSoundTapObject] = useState(null);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [soundObject, setSoundObject] = useState(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    loadMusic();
  }, []);

  const loadMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./app/assets/backsound.wav'),
        { shouldPlay: true, volume }
      );
      sound.setIsLoopingAsync(true);
      setSoundObject(sound);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (soundObject) {
      soundObject.setVolumeAsync(value);
    }
  };

  const handleSoundVolumeChange = (value) => {
    setSoundVolume(value);
    if (soundTapObject){
      soundTapObject.setVolumeAsync(value);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Instructions"
          component={InstructionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewImage"
          component={ViewImageScreen}
          options={{ headerShown: false }}
          initialParams={{ soundVolume }}
        />
        <Stack.Screen
          name="Levels"
          component={LevelsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          options={{ headerShown: false }}
        >
          {(props) => (
            <Configuration
              {...props}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              soundVolume={soundVolume}
              onSoundVolumeChange={handleSoundVolumeChange}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
