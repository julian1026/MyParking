import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import TopParkings from '../screens/TopParkings'

const Stack=createStackNavigator();
export default function TopParkingStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='top-parkings'
                component={TopParkings}
                options={
                    {title:'top- Parkings'}
                }
             />
        </Stack.Navigator>
    );
}
