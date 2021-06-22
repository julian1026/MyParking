
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
    const { navigation } = props;
    const [search, setSearch] = useState("");
    const [parkings, setParkings] = useState([]);

    useEffect(() => {
        if (search) {
            fireSQL
                .query(`SELECT * FROM parqueaderos WHERE nombre LIKE '${search}%'`)
                .then((response) => {
                    setParkings(response);
                    // console.log(response);
                });
        }
    }, [search])


    return (
        <View>
            <SearchBar
                placeholder="Busca tu parqueadero"
                onChangeText={(e) => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
                inputStyle={{ backgroundColor: "white" }}
            />

            {parkings.length === 0 ? (
                <NoFoundParkings />
            ) : (
                <FlatList
                    data={parkings}
                    renderItem={(parking) => (
                        <Parking parking={parking} navigation={navigation} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

            )}

        </View>

    );
}





function NoFoundParkings() {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Image
                source={require("../../assets/not-found-park.png")}
                resizeMode="cover"
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
}

function Parking(props) {
    const { parking, navigation } = props;
    const { id, nombre, imagenes } = parking.item;

    return (
        <ListItem
            title={nombre}
            leftAvatar={{
                source: imagenes[0]
                    ? { uri: imagenes[0] }
                    : require("../../assets/not-found-park.png"),
            }}
            rightIcon={<Icon type="material-community" name="chevron-right" />}
            onPress={() =>
                navigation.navigate("parkings2", {
                    screen: "parking2",
                    params: { id, nombre },
                })
            }
        />
    );
}


const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20,
        backgroundColor: "white",
        marginTop: 15,
        borderBottomColor: 'white',
        borderTopColor: 'white'


    },
});