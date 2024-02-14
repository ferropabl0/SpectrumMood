import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

const InstructionsScreen = ({navigation}) => {

  return (
    <ImageBackground
    style={styles.background}
    >
    
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>

      <Image source={require('../assets/resta.png')} style={styles.image} />

      <Text style={styles.subtitle}>Example situation: John is happy</Text>
      <Text style={styles.description}>
        Today, John had a very though day and after school, he went with his mother to have a walk. Afterwards she bought to him his favourite icecream! When someone around you is a little sad, you can try to do something to make them happier!
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Levels')}>
        <Text style={styles.startButtonText}>Lets start seeing new situations!</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
 background: {
    flex:1, //takes the entire screen
    backgroundColor: colors.light_blue,
    justifyContent: "center",
    alignItems: "center",
 },  
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: colors.light_yellow,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InstructionsScreen;