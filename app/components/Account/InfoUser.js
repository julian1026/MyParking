import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import defaultAvatar from '../../../assets/img/avatar-default.jpg';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { assign } from "lodash";

export default function InfoUSer(props){
    const {
        userInfo:{uid,photoURL,displayName,email},
        toastRef,
        setloading,
        setLoadigText
    }=props;
    // console.log(props.userInfo)
    const changeAvatar = async () => {
      console.log('julian');
      const resultPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL 
      );
      console.log(resultPermission);
      const resultPermissionCamera =resultPermission.permissions.cameraRoll.status;
  
      if (resultPermissionCamera === "denied") {
        toastRef.current.show("Es necesario aceptar los permisos de la galeria");
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          
        });
        console.log(result);

        if (result.cancelled) {
          toastRef.current.show("Has cerrado la seleccion de imagenes");
        } else {
          uploadImage(result.uri)
            .then(() => {
              console.log('image subida');

              updatePhotoUrl();
            })
            .catch(() => {
              console.log('image no subida');
              // console.log(result.uri);
              toastRef.current.show("Error al actualizar el avatar.");
            });
        }
    }
  }
  
  const uploadImage = async (uri) => {
    // console.log(uri);

    setLoadigText("Actualizando Avatar");
    setloading(true);//mostrando mensaje mientras actualiza imagen

    const response = await fetch(uri);
    // console.log(JSON.stringify(response));

    const blob = await response.blob();
    // console.log(JSON.stringify(blob));
    const ref = firebase.storage().ref().child(`avatar/${uid}`);//guardando la imagen en esta ruta
    return ref.put(blob);
  };
  //UTILIZO EL MISMO UID DEL USUARIO PARA TENER SOLO UN IDENTIFICA
  // Y PODER CAMBIAR LA IMAGEN
  const updatePhotoUrl=()=>{
    firebase
    .storage()
    .ref(`avatar/${uid}`)
    .getDownloadURL()
    .then(async(response) =>{
      const update={
        photoURL:response,
      };
      await firebase.auth().currentUser.updateProfile(update);//actualizo imagen
      console.log("imagen actualizada");
      setloading(false);
    })
    .catch(()=>{
      toastRef.current.show("Error al actualizar el avatar.");
    })  
  };


    return(
        <View style={styles.viewUserInfo} >
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