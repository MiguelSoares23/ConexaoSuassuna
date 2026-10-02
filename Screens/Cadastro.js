import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Cadastro({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
      />

      <TextInput
        style={styles.input}
        placeholder="Matrícula"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail institucional"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
      />

      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('Login')}
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
});