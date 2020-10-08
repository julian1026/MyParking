import React,{useState} from 'react'
import {SocialIcon} from 'react-native-elements'
import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook'
import {useNavigation} from '@react-navigation/native'
import {FacebookApi} from '../../utils/social'
import Loading from '../Loading'

export default function LoginFacebook(props){
    const {toastRef}=props;
    const navigation=useNavigation();
    const [loading, setloading] = useState(false)


    const login= async ()=>{
        await Facebook.initializeAsync(FacebookApi.application_id);
       const {type, token}= await Facebook.logInWithReadPermissionsAsync({
           permissions: FacebookApi.permissions,
       });
       if(type=== 'success'){
          // console.log('ok')
          setloading(true);
          const credentials=firebase.auth.FacebookAuthProvider.credential(token);
         // console.log(credentials)
        firebase
        .auth()
        .signInWithCredential(credentials)
        .then(()=>{
            setloading(false);
            navigation.navigate('account');
        })
        .catch(()=>{
            setloading(false);
            toastRef.current.show('Credenciales incorrectas')
        })

       }else if(type==='cancel'){
           toastRef.current.show('inicio de sesion cancelado')
       }else{
           toastRef.current.show('error desconocido intentelo mas tarde')
       }
      // console.log(result)
    }
    return(
        <>
        <SocialIcon
        title='Iniciar Sesion con Facebook'
        button
        type='facebook'
        onPress={login}
         />
         <Loading
         isVisible={loading}
         text='iniciando sesion'
          />
         </>
    );
}