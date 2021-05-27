import React from 'react'
import {
    View, Text, StyleSheet
    , Image, Button, Alert,
    ImageBackground, TouchableOpacity,
    TextInput, ScrollView
} from 'react-native'
import { Video } from 'expo-av';

const saludo = () => {
    Alert.alert('hi, you are wellcome!!')
}
export default function Practice() {


    return (
        <ImageBackground source={require('../assets/goku-smell.png')} style={[styles.container, styles.imgp]}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.box1}>
                            <Image source={require('../assets/skill.jpg')} style={styles.img} />
                            <Text>Work</Text>
                        </View>
                        <View style={styles.box2}>
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={[styles.box3]}>
                            <Button
                                onPress={saludo}
                                title='Login'
                                color='green'
                            />
                        </View>
                        <View style={styles.box4}>
                            <TouchableOpacity>
                                <Text style={styles.textColor}>Registrarse </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.box5}>
                            <TextInput placeholder='Ingresar nombre' placeholderTextColor='#008080'
                                maxLength={8}
                                style={styles.textInput}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.box6}>
                            <Video
                                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay={false}//que elvideo no empiese reproduciendo
                                useNativeControls={true}//activa las opciones del reproductor
                                isLooping
                                style={{ width: 300, height: 300 }}
                            />
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                            <Image source={require('../assets/goku-smell.png')} style={styles.img} />
                        </View>

                    </View>

                </View>
            </ScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flex: .5,
        flexDirection: 'row'
    },
    box1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor:'#8b0000'
    },
    box2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'#000000' 
    },
    body: {
        flex: .5,
        flexDirection: 'column'
    },
    box3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'#8fbc8f'
    },
    box4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        //backgroundColor:'#b0c4de'
    },
    box5: {
        flex: 1,
        // backgroundColor:'#f5f5f5'
    },
    footer: {
        flex: 1,
        flexDirection: 'column'
    },

    box6: {
        flex: 1,
        // backgroundColor:'#008080'
    },
    box7: {
        flex: 1,
        // backgroundColor:'#708090'
    },
    img: {
        width: 100,//I can play with these values
        height: 100,
        borderRadius: 50,
    },
    imgp: {
        width: 350,
        height: 100
    },
    textColor: {
        color: 'white'
    },
    textInput: {
        borderWidth: 5,
        borderColor: 'white',
        padding: 5,
        marginTop: 10,
        color: '#008000',
    }






})