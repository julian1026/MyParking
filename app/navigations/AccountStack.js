import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

//importando screen 

import Account from '../screens/Account/Account'

const Stack=createStackNavigator();

export default function AccountStack(){
    
    return(
        <Stack.Navigator>
            <Stack.Screen
            name='account'
            component={Account}
            options={{
                title:'My Cuenta'
            }}
             />
        </Stack.Navigator>
    );

}