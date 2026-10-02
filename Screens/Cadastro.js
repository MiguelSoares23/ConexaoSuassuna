import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = async () => {

    if (!nome || !matricula || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!'
      );

      navigation.navigate('Login');

    } catch (error) {

  console.log('ERRO DO FIREBASE:', error);

  Alert.alert(
    'Erro no cadastro',
    error.code + '\n\n' + error.message
  );
}
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Cadastro
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail institucional"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button
        title="Cadastrar"
        onPress={cadastrar}
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