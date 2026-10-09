import React from 'react';
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
} from 'react-native';

export default function Login({ navigation }) {
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
          <Text style={styles.titulo}>LOGIN</Text>

          {/* MATRÍCULA */}
          <View style={styles.grupo}>
            <Text style={styles.label}>Matrícula:</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite sua Matrícula"
              placeholderTextColor="#666"
              autoCapitalize="none"
            />
          </View>

          {/* SENHA */}
          <View style={styles.grupo}>
            <Text style={styles.label}>Senha:</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite sua Senha"
              placeholderTextColor="#666"
              secureTextEntry
            />
          </View>

          {/* BOTÃO ENTRAR */}
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotao}>ENTRAR</Text>

            <Text style={styles.seta}>→</Text>
          </TouchableOpacity>

          {/* CRIAR CONTA */}
          <Text style={styles.cadastroTexto}>
            Ainda não possui uma conta?{' '}
            <Text style={styles.cadastroLink} onPress={() => navigation.navigate('Cadastro')}>
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
