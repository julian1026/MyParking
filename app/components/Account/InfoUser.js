import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import defaultAvatar from '../../../assets/img/avatar-default.jpg';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function InfoUSer(props){
    const {
        userInfo:{photoURL,displayName,email},
        toastRef
    }=props;
    
    const changeAvatar = async () => {
      const resultPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      //console.log(resultPermission);
      const resultPermissionCamera =
        resultPermission.permissions.cameraRoll.status;
  
      if (resultPermissionCamera === "denied") {
        toastRef.current.show("Es necesario aceptar los permisos de la galeria");
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        if (result.cancelled) {
          toastRef.current.show("Has cerrado la seleccion de imagenes");
        } else {
          uploadImage(result.uri)
            .then(() => {
              updatePhotoUrl();
            })
            .catch(() => {
              toastRef.current.show("Error al actualizar el avatar.");
            });
        }
    }
  }
  
  const uploadImage = async (uri) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };



    return(
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={ 
                    photoURL
                     ?{uri:photoURL}
                     :require('../../../assets/img/avatar-default.jpg')}
             />
             <View>
                 <Text
                  style={styles.displayName}>
                      {displayName?displayName:'Anonimo'}
                 </Text>
                <Text>{email?email:'Social Login'}</Text>
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "#f2f2f2",
      paddingTop: 30,
      paddingBottom: 30,
    },
    userInfoAvatar: {
      marginRight: 20,
    },
    displayName: {
      fontWeight: "bold",
      paddingBottom: 5,
    },
  });