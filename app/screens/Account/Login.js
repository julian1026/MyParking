import React, { useRef } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import LoginForm from '../../components/Account/LoginForm'
import LoginFacebook from '../../components/Account/LoginFacebook'
import { Divider } from 'react-native-elements'


export default function Login() {
    const toastRef = useRef();
    return (
        <ScrollView>
            <Image
                source={require('../../../assets/img/img3.png')}
                style={styles.logo}
                resizeMode='contain'
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef} />
                <CreateAccounts />
            </View>
            <Toast ref={toastRef} position='center' opacity={0, 9} />
            <Divider style={styles.Divider} />
            <View style={styles.viewContainer}>

            </View>


        </ScrollView>

    );
}

// <LoginFacebook toastRef={toastRef} />


function CreateAccounts() {
    const navigation = useNavigation();
    return (
        <Text style={styles.textRegistrate}>
            A un no tienes una cuenta?
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate('register')}
            >
                Registrate
            </Text>
        </Text>

    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 10
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    textRegistrate: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 15
    },
    btnRegister: {
        color: '#40e0d0',
        fontWeight: 'bold'
    },
    Divider: {
        margin: 40,
        backgroundColor: '#00a680'
    }
})