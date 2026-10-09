import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import Home from './Screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: 'Cadastro' }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Biblioteca',
            headerBackVisible: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
