
import React from 'react';
import { YellowBox } from 'react-native'
import Navigation from './app/navigations/Navigation'
import {firebaseApp} from './app/utils/firebase'


export default function App() {

  YellowBox.ignoreWarnings([
    'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
    'Setting a timer'
  ])
  return (
  <Navigation />
  ) ;
}

