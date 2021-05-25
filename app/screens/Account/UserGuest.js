import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'



export default function UserGuest() {


    const Navigation = useNavigation();
    console.log(Navigation);
    return (
        <ScrollView
            centerContent={true}
            style={styles.viewBody}

        >

            <Image
                source={require("../../../assets/img/img3.png")}
                resizeMode='contain'
                style={styles.image}
            />
            {/* <Text
            style={[styles.nameLogo]} 
            >MyParking</Text> */}

            <Text style={styles.title} >Consulta tu Perfil</Text>
            <Text style={styles.description}>
                Busca y vizualiza los mejores parqueaderos que te brinda la ciudad
                Popayan, vota por el que te ha gustado  mas y comenta como ha sido
                tu experiencia.
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    title='Ver tu perfil'
                    buttonStyle={styles.BtnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={() => Navigation.navigate('login')}
                />
            </View>
        </ScrollView>
    );

}
const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,
    },
    image: {
        height: 300,
        width: '100%',
        marginBottom: 10,
        marginTop: 10
    },
    // nameLogo:{
    //     fontWeight:'bold',
    //     fontSize:24,
    //     marginBottom:10,
    //     textAlign:'center',
    // },

    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    },
    viewBtn: {
        flex: 1,
        alignItems: 'center',
    },
    BtnStyle: {
        backgroundColor: '#00a680',
    },
    btnContainer: {
        width: '70%'
    }


});