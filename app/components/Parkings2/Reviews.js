import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

const db = firebase.firestore(firebaseApp);

export default function Reviews(props) {
    const { navigation, idParking, setRating } = props;
    const [userLogged, setUserLogged] = useState(false);

    firebaseApp.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
        // console.log(user);
    })

    return (
        <View>
            {userLogged ? (
                <Button
                    title="Escribe una opinion"
                    buttonStyle={[styles.BtnStyle]}
                    containerStyle={styles.btnRegister}
                    icon={{
                        type: "material-community",
                        name: "square-edit-outline",
                        color: "#fff"
                    }}
                    onPress={() => navigation.navigate("addReviewParking", {
                        idParking: idParking
                    })}
                />
            ) : (
                <View>

                    <Text style={{ textAlign: "center", color: "#00a680", padding: 20 }}
                        onPress={() => navigation.navigate("login")}>
                        Para poder escribir un comentario es necesario estar logeado {" "}
                        <Text style={{ fontWeight: "bold" }}>
                            pulsa AQUI para iniciar sesion
                        </Text>
                    </Text>
                </View>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    BtnStyle: {
        backgroundColor: '#4682b4',
    },
    btnRegister: {
        marginTop: 10,
        marginLeft: 10,
        width: '95%'
    },
})
