
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  doc,
  getDoc,
} from 'firebase/firestore';

import { auth, db } from '../firebaseConfig';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const perfilSelecionado = route.params?.perfilSelecionado;

  const tentarLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert(
        'Atenção',
        'Preencha o e-mail institucional e a senha.'
      );
      return;
    }

    if (!perfilSelecionado) {
      Alert.alert(
        'Atenção',
        'Selecione se você é usuário ou administrador.'
      );
      return;
    }

    try {
      setCarregando(true);

      // 1. Autentica o usuário no Firebase Authentication
      const resultado = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        senha
      );

      const usuarioAutenticado = resultado.user;

      // 2. Busca o perfil do usuário no Firestore
      const usuarioRef = doc(
        db,
        'usuarios',
        usuarioAutenticado.uid
      );

      const usuarioSnapshot = await getDoc(usuarioRef);

      // 3. Verifica se existe um perfil cadastrado
      if (!usuarioSnapshot.exists()) {
        await signOut(auth);

        Alert.alert(
          'Perfil não encontrado',
          'Não encontramos os dados desse usuário no sistema.'
        );

        return;
      }

      const dadosUsuario = usuarioSnapshot.data();

      // 4. Identifica o tipo de usuário
      const tipoUsuario = dadosUsuario.tipo;

      let perfilCorreto = false;

      if (
        perfilSelecionado === 'usuario' &&
        tipoUsuario === 'discente'
      ) {
        perfilCorreto = true;
      }

      if (
        perfilSelecionado === 'adm' &&
        (
          tipoUsuario === 'adm' ||
          tipoUsuario === 'bibliotecario'
        )
      ) {
        perfilCorreto = true;
      }

      // 5. Verifica se o perfil selecionado corresponde
      // ao tipo de usuário cadastrado
      if (!perfilCorreto) {
        await signOut(auth);

        Alert.alert(
          'Acesso não autorizado',
          'O perfil selecionado não corresponde ao seu cadastro.'
        );

        return;
      }

      // 6. Login realizado com sucesso
      Alert.alert(
        'Login realizado',
        'Bem-vindo ao Conexão Suassuna!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('Home');
            },
          },
        ]
      );

    } catch (error) {
      console.log('ERRO NO LOGIN:', error);

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        Alert.alert(
          'Login inválido',
          'E-mail institucional ou senha incorretos.'
        );
      } else if (
        error.code === 'auth/invalid-email'
      ) {
        Alert.alert(
          'E-mail inválido',
          'Digite um e-mail institucional válido.'
        );
      } else if (
        error.code === 'auth/too-many-requests'
      ) {
        Alert.alert(
          'Muitas tentativas',
          'Aguarde um pouco antes de tentar novamente.'
        );
      } else {
        Alert.alert(
          'Erro no login',
          'Não foi possível realizar o login. Confira sua conexão e tente novamente.'
        );
      }

    } finally {
      setCarregando(false);
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
          <Image
            source={require('../assets/jucaa.png')}
            style={styles.logo}
          />
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.formulario}>
          <Text style={styles.titulo}>LOGIN</Text>

          {/* E-MAIL INSTITUCIONAL */}
          <View style={styles.grupo}>
            <Text style={styles.label}>
              E-mail institucional:
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail institucional"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* SENHA */}
          <View style={styles.grupo}>
            <Text style={styles.label}>Senha:</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#666"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          {/* BOTÃO ENTRAR */}
          <TouchableOpacity
            style={[
              styles.botao,
              carregando && styles.botaoDesativado,
            ]}
            onPress={tentarLogin}
            activeOpacity={0.8}
            disabled={carregando}
          >
            <Text style={styles.textoBotao}>
              {carregando ? 'ENTRANDO...' : 'ENTRAR'}
            </Text>

            {!carregando && (
              <Text style={styles.seta}>→</Text>
            )}
          </TouchableOpacity>

          {/* CRIAR CONTA */}
          <Text style={styles.cadastroTexto}>
            Ainda não possui uma conta?{' '}

            <Text
              style={styles.cadastroLink}
              onPress={() => navigation.navigate('Cadastro')}
            >
              Criar conta
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
    paddingTop: 25,
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
    width: 260,
    height: 190,
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
    marginBottom: 28,
    fontFamily: 'serif',
  },

  grupo: {
    width: '100%',
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 7,
  },

  input: {
    width: '100%',
    height: 50,
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

  botaoDesativado: {
    opacity: 0.6,
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
  // CRIAR CONTA
  // ============================

  cadastroTexto: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 14,
    color: '#000',
  },

  cadastroLink: {
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
