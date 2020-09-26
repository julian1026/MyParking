import React,{useState} from 'react'
import {View, StyleSheet} from 'react-native'

import {Input, Icon, Button} from 'react-native-elements'

export default function RegisterForm(){

    const [showPass, setShowPass]=useState(false);
    const [showPassRepeat, setShowPassRepeat]=useState(false)
    return(
        <View style={styles.containerFirst}>
            <Input
                placeholder='Correo Electronico'
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.IconRight}             
                     />
                }
             />
            <Input
                placeholder='contrasena'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPass?false:true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPass?'eye-off-outline':'eye-outline'}
                        onPress={()=>setShowPass(!showPass)}
                     />
                }
             />
            <Input
                placeholder='repetir contrasena'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassRepeat?false:true}//el securete permite si se ve o no la contra
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassRepeat?'eye-off-outline':'eye-outline'}
                        iconStyle={styles.IconRight}
                        onPress={()=>setShowPassRepeat(!showPassRepeat)}
                     />
                }
             />
             
             <Button
             title='Unirse'
             buttonStyle={[styles.BtnStyle]}
             containerStyle={styles.btnRegister}
              />
        </View>
    );
}

const styles=StyleSheet.create({
    containerFirst:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
         marginTop:30
    },
    inputForm:{
        width:'100%',
        marginTop:10
    },
    btnRegister:{
        marginTop:20,
        width:'95%'
    },
    BtnStyle:{
        backgroundColor:'#00a680',
    },
    IconRight:{
        color:'#c1c1c1'
    }
})