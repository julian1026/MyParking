import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {ListItem} from "react-native-elements";
import {map} from 'lodash';

export default function AccountOptions(props){
    const {userInfo, toasRef}=props;


    const selectComponent=(key)=>{
      console.log("Click");
      console.log(key);
    }
    const menuOptions=generateOptions(selectComponent);
    // console.log(menuOptions);

    return(
        <View>
            {map(menuOptions,(menu,index)=>(
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type:menu.iconType,
                        name:menu.iconNameLeft,
                        color:menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type:menu.iconType,
                        name:menu.iconNameRight,
                        color:menu.iconColorRight,

                    }}
                    containerStyle={styles.menuItems}
                    onPress={menu.onPress}
                     />
            ))}
        </View>
    );
}
//esta funcion contiene una lista de objetos que renderizara  el list item
function generateOptions(selectComponent){
    return[
        {
            title:"Cambiar Nombres y apellidos",
            iconType:"material-community",
            iconNameLeft:"account-circle",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress:()=>selectComponent("displayName"),
        },
        {
            title:"Cambiar Email",
            iconType:"material-community",
            iconNameLeft:"at",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress:()=>selectComponent("email"),
        },
        {
            title:"Cambiar Contrasena",
            iconType:"material-community",
            iconNameLeft:"lock-reset",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress:()=>selectComponent("password"),
        }
    ]
}

const styles=StyleSheet.create({
    menuItems:{
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",
    }
});
