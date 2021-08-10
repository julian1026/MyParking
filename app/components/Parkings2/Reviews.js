import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';
import { map } from 'lodash';
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import 'firebase/firestore'
const db = firebase.firestore(firebaseApp);

export default function Reviews(props) {
    const { navigation, idParking, setRating } = props;
    const [userLogged, setUserLogged] = useState(false);
    const [comentarios, setComentarios] = useState([]);

    firebaseApp.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
        // console.log(user);
    })


    //trayendo todos los comentarios de un solo parqueadero desde firestore


    useFocusEffect(
        useCallback(() => {
            db.collection("Comentarios")
                .where("idParking", "==", idParking)
                .get()
                .then((response) => {
                    const resultReview = [];
                    response.forEach((doc) => {
                        const data = doc.data();
                        data.id = doc.id;
                        resultReview.push(data);
                    });
                    setComentarios(resultReview);
                });
        }, [])

    );

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
                        idParking: idParking,
                    })}
                />
            ) : (
                <View>

                    <Text style={{ textAlign: "center", color: "#00a680", padding: 20 }}
                        onPress={() => navigation.navigate("account", { screen: "login" })}>
                        Para poder escribir un comentario es necesario estar logeado {" "}
                        <Text style={{ fontWeight: "bold" }}>
                            pulsa AQUI para iniciar sesion
                        </Text>
                    </Text>
                </View>
            )
            }

            {map(comentarios, (review, index) => (
                <Review key={index} review={review} />
            ))}

        </View>
    )
}

//este componente devuelve cada una de los comentarios realizados realidos a un parqueadero
function Review(props) {
    const { title, review, rating, createAt, avatarUser } = props.review;
    const createReview = new Date(createAt.seconds * 1000);

    return (
        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatar}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={
                        avatarUser
                            ? { uri: avatarUser }
                            : require("../../../assets/img/avatar-default.jpg")
                    }
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating imageSize={15} startingValue={rating} readonly />
                <Text style={styles.reviewDate}>
                    {createReview.getDate()}/{createReview.getMonth() + 1}/
                    {createReview.getFullYear()} - {createReview.getHours()}:
                    {createReview.getMinutes() < 10 ? "0" : ""}
                    {createReview.getMinutes()}
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    BtnStyle: {
        backgroundColor: '#008080',
        margin: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    btnRegister: {
        marginTop: 10,
        marginLeft: 10,
        width: '95%'
    },
    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1,
    },
    viewImageAvatar: {
        marginRight: 15,
    },
    imageAvatarUser: {
        width: 50,
        height: 50,
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start",
    },
    reviewTitle: {
        fontWeight: "bold",
    },
    reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5,
    },
    reviewDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0,
    },
})
