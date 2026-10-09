import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import Home from './Screens/Home';
import Acervo from './Screens/Acervo';
import Avisos from './Screens/Avisos';


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

        <Stack.Screen
          name="Acervo"
          component={Acervo}
          options={{
            title: 'Acervo',
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="Avisos"
          component={Avisos}
          options={{
            title: 'Avisos',
            headerBackVisible: false,
          }}
        />




      </Stack.Navigator>
    </NavigationContainer>
  );
}
