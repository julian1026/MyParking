import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Ubication from '../screens/Ubication'

const Stack=createStackNavigator();

export default function UbicationStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='ubication'
                component={Ubication}
                options={
                    {title:'Mi Ubicacion'}
                }
             />
        </Stack.Navigator>
    );
}