import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  createUserWithEmailAndPassword,
  deleteUser
} from 'firebase/auth';

import { auth, db } from '../firebaseConfig';

import {
  doc,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  

const cadastrar = async () => {
  if (
    !nome.trim() ||
    !matricula.trim() ||
    !email.trim() ||
    !senha
  ) {
    Alert.alert('Atenção', 'Preencha todos os campos.');
    return;
  }

  const matriculaFormatada = matricula.trim();
  const emailFormatado = email.trim().toLowerCase();

  // Evita problemas com caminhos de documentos
  if (matriculaFormatada.includes('/')) {
    Alert.alert('Atenção', 'Verifique a matrícula informada.');
    return;
  }

  let usuarioCriado = null;

  try {
    // 1. Cria a conta no Authentication
    const resultado = await createUserWithEmailAndPassword(
      auth,
      emailFormatado,
      senha
    );

    usuarioCriado = resultado.user;

    const usuarioRef = doc(db, 'usuarios', usuarioCriado.uid);
    const matriculaRef = doc(db, 'matriculas', matriculaFormatada);

    // 2. Reserva a matrícula e grava o perfil
    // na mesma transação do Firestore
    await runTransaction(db, async (transacao) => {
      const matriculaExistente = await transacao.get(matriculaRef);

      if (matriculaExistente.exists()) {
        throw new Error('MATRICULA_EM_USO');
      }

      transacao.set(matriculaRef, {
        uid: usuarioCriado.uid
      });

      transacao.set(usuarioRef, {
        nome: nome.trim(),
        matricula: matriculaFormatada,
        email: emailFormatado,
        tipo: 'discente',
        criadoEm: serverTimestamp()
      });
    });

    Alert.alert(
      'Sucesso',
      'Cadastro realizado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );

  } catch (error) {
    console.log('ERRO NO CADASTRO:', error);

    // Se o perfil não foi gravado, tenta remover
    // a conta recém-criada para evitar cadastro incompleto.
    if (usuarioCriado) {
      try {
        await deleteUser(usuarioCriado);
      } catch (erroExclusao) {
        console.log(
          'Não foi possível remover a conta criada:',
          erroExclusao
        );
      }
    }

    if (error.message === 'MATRICULA_EM_USO') {
      Alert.alert(
        'Matrícula já cadastrada',
        'Essa matrícula já está sendo utilizada. Verifique os dados.'
      );
    } else if (error.code === 'auth/email-already-in-use') {
      Alert.alert(
        'E-mail já cadastrado',
        'Já existe uma conta com esse e-mail.'
      );
    } else {
      Alert.alert(
        'Erro no cadastro',
        'Não foi possível concluir o cadastro. Confira sua conexão e as regras do Firestore.'
      );
    }
  }
};
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* LOGO */}
        <View style={styles.areaLogo}>
          <Image source={require('../assets/jucaa.png')} style={styles.logo} />
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.formulario}>
          <Text style={styles.titulo}>CADASTRO</Text>

          {/* NOME */}
          <View style={styles.grupo}>
            <Text style={styles.label}>Nome:</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#666"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* MATRÍCULA */}
          <View style={styles.grupo}>
            <Text style={styles.label}>Matrícula:</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite sua matrícula"
              placeholderTextColor="#666"
              value={matricula}
              onChangeText={setMatricula}
            />
          </View>

          {/* E-MAIL */}
          <View style={styles.grupo}>
            <Text style={styles.label}>E-mail institucional:</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail institucional"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* SENHA */}
          <View style={styles.grupo}>
            <Text style={styles.label}>Senha:</Text>

            <TextInput
              style={styles.input}
              placeholder="Crie uma senha"
              placeholderTextColor="#666"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          {/* BOTÃO CADASTRAR */}
          <TouchableOpacity style={styles.botao} onPress={cadastrar} activeOpacity={0.8}>
            <Text style={styles.textoBotao}>CADASTRAR</Text>

            <Text style={styles.seta}>→</Text>
          </TouchableOpacity>

          {/* VOLTAR PARA LOGIN */}
          <Text style={styles.loginTexto}>
            Já possui uma conta?{' '}
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              Entrar
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* RODAPÉ */}
      <View style={styles.rodape} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // ============================
  // TELA
  // ============================

  container: {
    flex: 1,
    backgroundColor: '#9BC583',
  },

  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 35,
  },

  // ============================
  // LOGO
  // ============================

  areaLogo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  logo: {
    width: 250,
    height: 170,
    resizeMode: 'contain',
  },

  // ============================
  // FORMULÁRIO
  // ============================

  formulario: {
    width: '100%',
    maxWidth: 400,
  },

  titulo: {
    fontSize: 34,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'serif',
  },

  grupo: {
    width: '100%',
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 7,
  },

  input: {
    width: '100%',
    height: 48,

    borderWidth: 1.5,
    borderColor: '#315D20',

    backgroundColor: 'rgba(255,255,255,0.15)',

    paddingHorizontal: 14,

    fontSize: 16,
    color: '#000',

    borderRadius: 4,
  },

  // ============================
  // BOTÃO
  // ============================

  botao: {
    width: '65%',
    height: 48,

    alignSelf: 'center',

    backgroundColor: '#145000',

    borderRadius: 25,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 8,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    marginRight: 12,
  },

  seta: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
  },

  // ============================
  // LOGIN
  // ============================

  loginTexto: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 14,
    color: '#000',
  },

  loginLink: {
    color: '#145000',
    fontWeight: '900',
  },

  // ============================
  // RODAPÉ
  // ============================

  rodape: {
    height: 30,
    backgroundColor: '#145000',
  },
});
