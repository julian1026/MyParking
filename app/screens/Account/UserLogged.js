import React from 'react'
import {View,Text,Button} from 'react-native'
import * as firebase from 'firebase'


export default function UserLogged(){
    return(
        <View>
            <Text>userLogged...</Text>
            <Button title='Cerrar Session'
                onPress={()=>firebase.auth().signOut()}
             />
        </View>
    );
}