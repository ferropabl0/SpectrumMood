import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

const LevelsScreen = ({navigation}) => {

    return(
        <ImageBackground style={styles.background}>

    <View style={styles.container}>
        <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewImage')} activeOpacity={0.7}>
            <Image style={styles.buttonImage} source={require('../assets/division.png')} />
            <Text>             At home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ViewImage')} activeOpacity={0.7}>
            <Image style={styles.buttonImage} source={require('../assets/resta.png')} />
            <Text>            At school</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ViewImage')} activeOpacity={0.7}>
            <Image style={styles.buttonImage} source={require('../assets/suma.png')} />
            <Text>           In the park</Text>
            </TouchableOpacity>
        </View>

        {/* Resto del contenido del componente */}
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
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      },
      buttonImage: {
        width: 100,
        height: 100,
        marginLeft: 10,
      },

});
export default LevelsScreen;