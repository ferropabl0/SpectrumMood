import { NavigationHelpersContext } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Slider, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import colors from '../config/colors'

const Configuration = ({navigation, volume, onVolumeChange, soundVolume, onSoundVolumeChange }) => {

  const handleVolumeChange = (value) => {
    onVolumeChange(value);
  };
  const handleSoundVolumeChange = (value) => {
    onSoundVolumeChange(value);
  };

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.sliderMusicText}> Music Volume</Text>
        <Slider
          style={styles.slider1}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          />
        <Text style={styles.volumeLabel}>Volume: {Math.round(volume * 100)}%</Text>
        <Text style={styles.sliderSoundText}> Sound Volume</Text>
          <Slider
          style={styles.slider2}
          minimumValue={0}
          maximumValue={1}
          value={soundVolume}
          onValueChange={handleSoundVolumeChange}
        />
      <Text style={styles.volumeSoundLabel}>Volume: {Math.round(soundVolume * 100)}%</Text>
    </View>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
      <Text style={styles.backText}>Go Back</Text>
    </TouchableOpacity>
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  backText: {
    fontSize:18,
    fontWeight:'bold',
    color:colors.light_red,
    fontFamily:'Arial',
  },
  sliderMusicText: {
    fontSize:30,
    fontWeight:'bold',
    color:colors.white,
    position:'absolute',
    top:160,
    left:40,
  },
  sliderSoundText: {
    fontSize:30,
    fontWeight:'bold',
    color:colors.white,
    position:'absolute',
    top:400,
    left:40,
  },
  backButton: {
    position:'absolute',
    top:60,
    left:40,
    padding:10,
    backgroundColor:colors.light_yellow,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  background: {
    flex:1, //takes the entire screen
    backgroundColor: colors.light_blue,
 }, 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slider1: {
    width: '80%',
    marginBottom: 20,
    position:'absolute',
    top:220
  },
  slider2: {
    width: '80%',
    marginBottom: 20,
    position:'absolute',
    top:460
  },
  volumeLabel: {
    fontSize: 18,
    position:'absolute',
    top:270,
    left:50
  },
  volumeSoundLabel: {
    fontSize: 18,
    position:'absolute',
    top:510,
    left:50
  },
});

export default Configuration;
