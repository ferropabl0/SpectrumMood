import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import data from '../assets/listado.json';
import { Audio } from 'expo-av'
import colors from '../config/colors'

const ViewImageScreen = (volume) => {

  const emotions = ['Felicidad', 'Tristeza', 'Enfado', 'Duda'];

  const volumeSound = volume.route.params.soundVolume;

  const audio = require('../assets/correct.wav');

  const [level, setLevel] = useState(0);

  // cosas usadas para la navegacion hacia atras
  const navigation = useNavigation();

  const handleBackButtonPress = () => {
    navigation.navigate('Welcome');
  };

  //cosas usadas para poner la imagen grande nada mas iniciar la pantalla
  const [bigImage, setBigImage] = useState(require('../assets/Image1.jpeg'));
  
  //lista de todas las imagenes, la idea es poner aqui las 40 porque la nazi no va a leer el codigo
  const images = [
    require('../assets/suma.png'),
    require('../assets/Image1.jpeg'),
    require('../assets/Image2.jpeg'),
    // Agrega las rutas de las demás imágenes aquí
  ];

  // cosas usadas para definir la emocion que representa la imagen grande, usa el data, que esta cargado arriba con el json listado.json
  const [currentEmotion, setCurrentEmotion] = useState(data[0].emocion);

  const [currentEmotions, setCurrentEmotions] = useState([]);

  const handleEmotionsChange = () => {
    const correctEmotion = currentEmotion;
    console.log(correctEmotion);
    const otherEmotions = emotions.filter(emotion => emotion !== correctEmotion);
    const randomEmotions = getRandomEmotions(otherEmotions, 2);
    
    const allEmotions = [correctEmotion, ...randomEmotions];
    const shuffledEmotions = shuffleArray(allEmotions);
  
    setCurrentEmotions(shuffledEmotions);
  };

  //constante usada para que el score vaya subiendose
  const [score, setScore] = useState(0);

  //funcion que se ejecuta cunado se pulsa una imagen, lo que hace es seleccionar una imagen random del listado
  //luego cambiarlo si queremos hacer lo de los niveles y que sea progresivo
  const handleImagePress = (level) => {
    console.log('emocion justo al ejecutar el metodo'+currentEmotion);
    setBigImage(images[level - 1]);

    //Establecer la emocion correspondiente a la imagen mostrada:
    console.log(data[level].emocion);
    const emotion = data[level].emocion;
    console.log('emocion antes de setCurrent'+emotion);
    setCurrentEmotion(emotion);
    console.log('emocion despues de setcurrent'+currentEmotion);
  };

  const handlePlaySound = async () => {
    const soundObj = new Audio.Sound();
    try {
      console.log(volumeSound);
      let source = audio;
      await soundObj.loadAsync(source);
      await soundObj.setVolumeAsync(volumeSound);
      await soundObj.playAsync().then(async playbackStatus => {
          setTimeout(() => {
            soundObj.unloadAsync()
          }, playbackStatus.playableDurationMillis);
        });
    } catch (error){
      console.log('Error', error);
    }
  };

  //funcion que se ejecuta cuando se pulsa la emocion correcta, lo que hace basicamente es sumar un punto si la emocion corresponde con la de la imagen grande
  const handleCorrectButtonPress = (emocion, level) => {
    if (emocion == currentEmotion) {
      setScore(score + 1);
      handlePlaySound();
      setLevel(prevLevel => prevLevel + 1)
      handleImagePress(level + 1);
    }
  };
  useEffect(() => {
    handleEmotionsChange();
  }, [currentEmotion]);

  const getRandomEmotions = (emotionList, count) => {
    const shuffledList = shuffleArray(emotionList);
    console.log(shuffledList.slice(0,count));
    return shuffledList.slice(0, count);
  };
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  const getImageForEmotion = (emotion) => {
    switch (emotion) {
      case 'Felicidad':
        return require('../assets/felicidad.png');
      case 'Tristeza':
        return require('../assets/tristeza.png');
      case 'Enfado':
        return require('../assets/enfado.png');
      case 'Duda':
        return require('../assets/duda.png');
      // Agrega los casos para las demás emociones y sus imágenes correspondientes
      default:
        return null;
    }
  };
  
  

  //funcion que se ejecuta cuando se pulsa la imagen, esto lo hice para que se ejecutasen dos funciones cuando se pulsa una imagen, como las emociones 
  //fijas, cada indice corresponde a una emocion !!!!LUEGO CAMBIARLO POR EMOCIONES DE VERDAD JASJFSAJF
  const handleTouchablePress = (index, level) => {
    let emocion;
    emocion = currentEmotions[index];
    console.log('ce'+emocion);
    handleCorrectButtonPress(emocion, level);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bigGrid}>
        <View style={[styles.row, { flex: 15 }]}>
          <View style={styles.firstColumn}>
            <TouchableOpacity style={styles.backButton} onPress={() => handleBackButtonPress()}>
              <Text style={styles.backText}> Go Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.secondColumn}>
            <Text style={styles.scoreText}>Score: {score}</Text>
          </View>
        </View>
        <View style={[styles.row, { flex: 55 }]}>
          <Image source={bigImage} style={styles.image} />
        </View>
        <View style={[styles.row, { flex: 30 }]}>
          <View style={styles.innerGrid}>
            <TouchableOpacity onPress={() => handleTouchablePress(0, level)}>
              <Image source={getImageForEmotion(currentEmotions[0])} style={styles.innerImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTouchablePress(1, level)}>
              <Image source={getImageForEmotion(currentEmotions[1])} style={styles.innerImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTouchablePress(2, level)}>
              <Image source={getImageForEmotion(currentEmotions[2])} style={styles.innerImage} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

//Estilos
const styles = StyleSheet.create({
  //estilo para la pantalla entera
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize:18,
    fontWeight:'bold',
    color:colors.light_red,
    fontFamily:'Arial',
  },
  backButton: {
    position:'absolute',
    top:30,
    left:30,
    padding:10,
    backgroundColor:colors.light_yellow,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  //estilo para el grid grande que separa a la pantalla en 3 filas
  bigGrid: {
    flexDirection: 'column',
    flex: 1,
  },
  //estilo que define a las filas
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  //estilos que definen a las columnas
  firstColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  secondColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
  },
  //estilo de la imagen grande
  image: {
    width: "80%",
    height: "80%",
    marginLeft: 40,
    marginRight: 40,
  },
  //estilo que define al grid interno, para los touchables
  innerGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //estilo para definir a las imagenes touchables
  innerImage: {
    width: 80,
    height: 80,
    margin: 30,
  },
  //estilo para definir el texto del score
  scoreText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default ViewImageScreen;
