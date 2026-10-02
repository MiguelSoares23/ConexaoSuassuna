import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Matrícula"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
      />

      <Button
        title="Entrar"
        onPress={() => navigation.navigate('Home')}
      />

      <View style={styles.espaco} />

      <Button
        title="Criar conta"
        onPress={() => navigation.navigate('Cadastro')}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
  },

  espaco: {
    height: 15,
  },
});