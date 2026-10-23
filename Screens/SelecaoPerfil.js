import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function SelecaoPerfil({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/jucaa.png')}
        style={styles.logo}
      />

      <Text style={styles.titulo}>
        Olá, antes de prosseguir, nos informe se você é:
      </Text>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            navigation.navigate('Login', { perfilSelecionado: 'adm' })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Administrador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            navigation.navigate('Login', { perfilSelecionado: 'usuario' })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Usuário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BC583',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '900',
    fontFamily: 'serif',
    color: '#000',
    textAlign: 'center',
    marginBottom: 45,
  },

  botoes: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },

  botao: {
    flex: 1,
    minHeight: 65,
    backgroundColor: '#222222',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});