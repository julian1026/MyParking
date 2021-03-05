import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Button,Input} from 'react-native-elements';
import * as firebase from 'firebase';
import { set } from 'lodash';


export default function ChangeDisplayNameForm(props){

    const {displayName,setShowModal,toasRef,setReloadUseInfo}=props;
    const [newDisplayName, setNewDisplayName]=useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

   

    const onSubmit=()=>{
        if(!newDisplayName){
            setError('El nombre no puede estar vacio.');
        }else if(newDisplayName===displayName){
            setError('El nombre no puede ser igual al actual.')
        }else{
            setIsLoading(true)
            const update={
                displayName:newDisplayName
            }
            firebase
            .auth()
            .currentUser.updateProfile(update)
            .then(()=>{
                // console.log('ok');
                setIsLoading(false);//cerrando el spiner de carga
                setReloadUseInfo(true);
                setShowModal(false);//cerrando el modal
            })
            .catch(()=>{
                console.log('Error al actualizar el nombre');
                setIsLoading(false);
            })
        }
    }
    return(
        <View style={styles.view}>
            <Input
            
            placeholder="Nombre y Apellidos"
            containerStyle={styles.input}
            rightIcon={{
                type:"material-community",
                name:"account-circle-outline",
                color:"#c2c2c2"
                }}
            defaultValue={displayName || ""}
            onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}//en esta variable capturo el valor  cajatexto
            errorMessage={error}
             />
            <Button
            title="Cambiar Nombre"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={isLoading}
             />
        </View>
    );
}

const styles=StyleSheet.create({
    view:{
        alignItems:'center',
        padding:10,
        paddingBottom:10
    },
    input:{
        marginBottom:10,

    },
    btnContainer:{
       marginTop:20,
       width:'95%',
    },
    btn:{
        backgroundColor:'#00a680'
    }

});