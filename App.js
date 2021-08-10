
import React from 'react';
import { LogBox, YellowBox } from 'react-native'
import Navigation from './app/navigations/Navigation'
import { firebaseApp } from './app/utils/firebase'
import { decode, encode } from 'base-64'

export default function App() {
  LogBox.ignoreLogs([
    'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
    'Setting a timer', 'Remote debugger',
    'Cannot update a component from inside the function body of a different component', "Can't perform a React state update on an unmounted component"
  ])
  if (!global.btoa) global.btoa = encode;
  if (!global.atob) global.atob = decode;
  return (

    <Navigation />
  );
}

