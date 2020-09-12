import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//trayendo los screen 

import Account from './screens/Counts';
import Favorites from './screens/Favorites';
import Parkings  from './screens/Parkings';
import TopParkings from './screens/TopParkings';
import Ubication from './screens/Ubication';

const Tab =createBottomTabNavigator();

export default function Navigation(){
    
    return (
        <NavigationContainer>
            <Tab.Navigator
            // initialRouteName='restaurants' // app inicie en el boton restaurants
            // tabBarOptions={{   // se controla los colores del tabBar
            //     inactiveTintColor:'#070707',//color general tabOptin
            //     activeTintColor:'#34CD0E',//color especifico
            // }}

            // // en esta parte cargo la funcion que me permitira cargar iconos
            // screenOptions={({route})=>({
            //     tabBarIcon:({color})=>screenOptions(route, color),
            // })}
            >
                
                <Tab.Screen
                name='ubication'
                component={Ubication}
                options={{title:"Ubicacion"}}
                 />

                 <Tab.Screen 
                 name='favorites'
                 component={Favorites}
                 options={{title:"Mis Favoritos"}}
                 />

                 <Tab.Screen
                 name='parkings'
                 component={Parkings}
                 options={{title:"Parqueaderos"}}
                  />

                <Tab.Screen
                name='top-parkings'
                component={TopParkings}
                options={{title:"Top-5"}}
                 />

                <Tab.Screen
                name='accounts'
                component={Account}
                options={{title:"Cuenta"}}
                />


            </Tab.Navigator>
        </NavigationContainer>
    );
    
}


