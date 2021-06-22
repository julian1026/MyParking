import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Favorites from '../screens/Favorites'

const Stack = createStackNavigator();

export default function FavoriteStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#008080',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >

            <Stack.Screen
                name='favorites'
                component={Favorites}
                options={
                    { title: 'Mis Favoritos' }
                }
            />
        </Stack.Navigator>
    );
}