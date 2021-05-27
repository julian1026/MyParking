import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'

export default function Parkings2(props) {
    const { navigation } = props
    const [user, setUser] = useState(null);

    //si el usuario esta logeado muestra boton 
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            // console.log(userInfo.email)
            setUser(userInfo);
        })
    }, [])

    return (
        <View style={styles.viewBody}>
            <Text>Parqueaderos control</Text>
            {user && (
                <Icon
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate('addParqueaderos2')}
                />
            )}

        </View>
    );
}
const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    },
    btnContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,

    }
})