import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Parkings from '../screens/Parkings'

const Stack=createStackNavigator();

export default function ParkingStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='parkings'
                component={Parkings}
                options={{
                    title:'Parqueaderos'
                }}
             />
        </Stack.Navigator>
    );
}