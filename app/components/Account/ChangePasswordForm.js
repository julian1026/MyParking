import React,{useState} from 'react'
import {View,StyleSheet,Text} from 'react-native'
import {Button,Input} from 'react-native-elements'
import * as firebase from 'firebase'

import {Reauthenticate} from '../../utils/api';

export default function ChangePasswordForm(props){
    const {setShowModal,toastRef}=props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaulValue());
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    

    const onSubmit=async()=>{
        let setFlag=true;
        let errorTemp={};
        setErrors({});
        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword){
            errorTemp={
                password: !formData.password ?'la contrasena no puede estar vacia.':'',
                newPassword: !formData.newPassword ? 'la contrasena no puede estar vacia.':'',
                repeatNewPassword: !formData.repeatNewPassword ? 'la contrasena no puede estar vacia':'',
            }
            
        }else if(formData.newPassword != formData.repeatNewPassword){
            errorTemp={
                newPassword:'Las contrasenas no son iguales',
                repeatNewPassword:'Las contrasenas no son iguales'
            }
            
        }else if(formData.newPassword.length<6){
            errorTemp={
                newPassword:'Como minimo seis caracteres.',
                repeatNewPassword:'Como minimo seis caracteres.'
            }
            
        }else{
         setIsLoading(true)
         await Reauthenticate(formData.password)
         .then(async ()=>{
            await firebase.auth()
             .currentUser.updatePassword(formData.newPassword)
             .then(()=>{
                 setFlag=false
                 setIsLoading(false)
                 setShowModal(false)
                 firebase.auth().signOut()

             }).catch((error)=>{
                 console.log(error)
                errorTemp={other:'Error al actualizar la contrasena'}
                setIsLoading(false)
             })

         }).catch(()=>{
            
            errorTemp={password:'La contrasena no es correcta'}
            setIsLoading(false)

         })
            
        }
        setFlag && setErrors(errorTemp);
    }




    const onChange=(e,type)=>{
        setFormData({...formData,[type]:e.nativeEvent.text})
    }



    return(
        <View style={styles.view}>
            <Input
                placeholder="Contrasena Actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword?false:true}
                rightIcon={{
                    type:'material-community',
                    name:showPassword?"eye-off-outline":"eye-outline",
                    color:'#c2c2c2',
                    onPress:()=>setShowPassword(!showPassword)
                }}
                onChange={(e)=>onChange(e,"password")}
                errorMessage={errors.password}
             />
            <Input
                placeholder="Contrasena Nueva"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword?false:true}
                rightIcon={{
                    type:'material-community',
                    name:showPassword?"eye-off-outline":"eye-outline",
                    color:'#c2c2c2',
                    onPress:()=>setShowPassword(!showPassword)
                }}
                onChange={(e)=>onChange(e,"newPassword")}
                errorMessage={errors.newPassword}
             />
            <Input
                placeholder="Repetir Nueva Contrasena"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword?false:true}
                rightIcon={{
                    type:'material-community',
                    name:showPassword?"eye-off-outline":"eye-outline",
                    color:'#c2c2c2',
                    onPress:()=>setShowPassword(!showPassword)
                }}
                onChange={(e)=>onChange(e,"repeatNewPassword")}
                errorMessage={errors.repeatNewPassword}
             />
             <Text>{errors.other}</Text>
            <Button
                containerStyle={styles.btnContainer}
                title="Cambiar  Contrasena"
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
                
             />
        </View>
    )
}

function defaulValue(){
    return{
        password:'',
        newPassword:'',
        repeatNewPassword:''
    }
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
        width:'95%'
    },btn:{
        backgroundColor:'#00a680'
    }
    
})