import React,{useState} from 'react'
import {View, StyleSheet} from 'react-native'

import {Input, Icon, Button} from 'react-native-elements'
import {validateEmail} from '../../utils/validations'
import {size, isEmpty} from 'lodash'

export default function RegisterForm(){
    
    const [showPass, setShowPass]=useState(false);
    const [showPassRepeat, setShowPassRepeat]=useState(false)
    const [FormData, setFormData] = useState(CapturarDatos())

    const onSubmit=()=>{       
        if(isEmpty(FormData.email)|| isEmpty(FormData.pass)|| isEmpty(FormData.repeatPass)){
            console.log('todos los campos son requeridos')
        }else if(!validateEmail(FormData.email)){
            console.log('emeil no valido')
        }else if(FormData.pass!==FormData.repeatPass){
            console.log('las contrasena no coincide')
        }else if(size(FormData.pass)<6){
            console.log('como minimo 6 caracteres')
        }
        else{
            console.log('emeil ok')
        }
    }
    // console.log(FormData)
    const onChange=(e, type)=>{
        // console.log(type)
        // console.log(e.nativeEvent.text)
        //setFormData({[type]:e.nativeEvent.text})
        setFormData({...FormData,[type]:e.nativeEvent.text})
    }

    return(
        <View style={styles.containerFirst}>
            <Input
                placeholder='Correo Electronico'
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e, 'email')}
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
                onChange={(e)=>onChange(e, 'pass')}
                password={true}
                secureTextEntry={showPass?false:true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPass?'eye-off-outline':'eye-outline'}
                        iconStyle={styles.IconRight}
                        onPress={()=>setShowPass(!showPass)}
                     />
                }
             />
            <Input
                placeholder='repetir contrasena'
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e,'repeatPass')}
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
             onPress={onSubmit}
             
              />
        </View>
    );
}

function CapturarDatos(){
    return{
            email:'',
            pass:'',
            repeatPass:'',
        }
    
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