import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";

export default function ListTopRanking(props) {
    const { parkings, navigation } = props;

    return (
        <FlatList
            data={parkings}
            renderItem={(parking) => (
                <Parking parking={parking} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

const Parking = (props) => {
    const { parking, navigation } = props;
    const { id, nombre, rating, imagenes, descripcion } = parking.item;
    const [iconColor, setIconColor] = useState("#000");

    useEffect(() => {
        if (parking.index === 0) {
            setIconColor("#efb819");
        } else if (parking.index === 1) {
            setIconColor("#e3e4e5");
        } else if (parking.index === 2) {
            setIconColor("#cd7f32");
        }
    }, []);


    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("parkings2", {
                    screen: "parking2",
                    params: { id, nombre },
                })
            }
        >
            <Card containerStyle={styles.containerCard}>
                <Icon
                    type="material-community"
                    name="chess-queen"
                    color={iconColor}
                    size={40}
                    containerStyle={styles.containerIcon}
                />
                <Image
                    style={styles.parkingImage}
                    resizeMode="cover"
                    source={
                        imagenes[0]
                            ? { uri: imagenes[0] }
                            : require("../../../assets/no-image.png")
                    }
                />
                <View style={styles.titleRating}>
                    <Text style={styles.title}>{nombre}</Text>
                    <Rating imageSize={20} startingValue={rating}
                        readonly//no permite modificar las estrellas
                        style={{ backgroundColor: "grey" }}
                    />
                </View>
                <Text style={styles.description}>{descripcion}</Text>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerCard: {
        marginBottom: 30,
        borderWidth: 0,
        backgroundColor: '#f0ffff'
    },
    containerIcon: {
        position: "absolute",
        top: -30,
        left: -30,
        zIndex: 1,
    },
    parkingImage: {
        width: "100%",
        height: 200,
    },
    titleRating: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        color: "grey",
        marginTop: 0,
        textAlign: "justify",
    },
})
