import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Search from '../screens/Search'

const Stack = createStackNavigator();

export default function SearchStack() {
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
                name='search'
                component={Search}
                options={{
                    title: 'Buscador'
                }}
            />
        </Stack.Navigator>
    );
}