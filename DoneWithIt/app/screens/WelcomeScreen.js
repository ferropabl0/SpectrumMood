import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

//De aqui lo unico que he hecho ha sido incluir lo de navigation como parametro (lo decia el chatGPT) y hacer que el boton haga cambiar la pantalla

const WelcomeScreen = ({navigation}) => {

    return (
        <ImageBackground
          style={styles.background}
          source={require('../assets/background.jpeg')}
        >
        <View style= {styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/icon.png')}/>
        <Text style={styles.appTitle}>SpectrumMood</Text>
        </View>

        <TouchableOpacity style={styles.instructionsButton} onPress={() => navigation.navigate('Instructions')}>
        <Text style={styles.buttonText}>Play!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

        
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
    gameButton: {
        width: 250,
        height: 70,
        backgroundColor: colors.light_yellow,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    logo:{
        width: 150,
        height: 150,
        marginTop: 40,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        marginTop: 10,
      },
    instructionsButton: {
        width: 250,
        height: 70,
        backgroundColor: colors.light_yellow,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 160,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.light_red,
        fontFamily: 'Arial', // Cambia la fuente del texto aquí
    },
    settingsButton: {
        width: 250,
        height: 70,
        backgroundColor: colors.light_yellow,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 40,
    },
    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center',
        
    }
});

export default WelcomeScreen;