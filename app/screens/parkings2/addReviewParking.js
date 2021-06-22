import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AirbnbRating, Input, Button } from 'react-native-elements';
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddReviewParking(props) {
    const { navigation, route } = props;
    const { idParking } = route.params;
    const [rating, setRating] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

    const enviarReview = () => {
        if (!rating) {
            toastRef.current.show("No has dado ninguna putuacion");
        } else if (!titulo) {
            toastRef.current.show("El titulo es oblogatorio");
        } else if (!review) {
            toastRef.current.show("El comentatio es obligatorio");
        } else {
            setIsLoading(true);
            const user = firebase.auth().currentUser;//trayendo el usuario logueado para tomar sus datos
            const paylod = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idParking: idParking,
                title: titulo,
                review: review,
                rating: rating,
                createAt: new Date(),
            };
            db.collection("Comentarios")
                .add(paylod)
                .then(() => {
                    updateParking();
                })
                .catch(() => {
                    toastRef.current.show("Error al enviar el comentario");
                    setIsLoading(false);
                });
        }
    }

    const updateParking = () => {
        const parkingRef = db.collection("parqueaderos").doc(idParking);

        parkingRef.get().then((response) => {
            const parkingData = response.data();
            const ratingTotal = parkingData.ratingTotal + rating;
            const quantityVoting = parkingData.quantityVoting + 1;//cantidad de usuarios que votan
            const ratingResult = ratingTotal / quantityVoting;//obteniendo el rating referentes al ratinTotal y la catidad de usuarios que han votado
            parkingRef
                .update({
                    rating: ratingResult,
                    ratingTotal,
                    quantityVoting,
                })
                .then(() => {
                    setIsLoading(false);
                    navigation.goBack();//redirigue a la screen anterior
                });
        });
    };

    return (
        <ScrollView>
            <View style={styles.viewBody}>
                <View style={styles.viewRating}>
                    <AirbnbRating
                        count={5}
                        reviews={["Pesimo", "Regular", "Bueno", "muy Bueno", "Excelente"]}
                        defaultRating={0}
                        size={35}
                        onFinishRating={(value) => { setRating(value) }}
                    />
                </View>
                <View style={styles.reviewForm}>
                    <Input
                        placeholder="Titulo"
                        containerStyle={styles.input}
                        onChange={(e) => setTitulo(e.nativeEvent.text)}
                    />
                    <Input
                        placeholder="Comentario"
                        multiline={true}
                        inputContainerStyle={styles.textAreaReview}
                        onChange={(e) => setReview(e.nativeEvent.text)}
                    />
                    <Button
                        title="Enviar Comentario"
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btn}
                        onPress={enviarReview}
                    />

                </View>
                <Toast ref={toastRef} position="center" opacity={0.9} />
                <Loading isVisible={isLoading} text="Enviando comentario" />
            </View>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewRating: {
        height: 110,
        backgroundColor: "#f2f2f2"
    },
    reviewForm: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    input: {
        marginBottom: 10
    },
    textAreaReview: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 90,
        marginBottom: 10,
        width: "95%"
    },
    btn: {
        backgroundColor: "#008080",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
})
