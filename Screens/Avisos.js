
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  useWindowDimensions,
} from 'react-native';

const avisos = [
  {
    titulo: 'Devoluções em Atraso',
    mensagem:
      'A partir de segunda-feira, iniciaremos a campanha "Páginas Limpas". Devolva seus livros atrasados sem o pagamento de multa administrativa. Aproveite para regularizar seu cadastro!',
    data: '14/04/2026',
    cor: '#FF2929',
  },
  {
    titulo: 'Clube do Livro',
    mensagem:
      'As inscrições para o debate de maio estão abertas! O tema do mês será "Literatura Contemporânea e Tecnologia". Garanta sua vaga!',
    data: '12/04/2026',
    cor: '#FFFFFF',
  },
  {
    titulo: 'Cuidado',
    mensagem:
      'Lembramos que não é permitido o consumo de alimentos ou bebidas (exceto água em garrafa fechada) próximo ao acervo físico para garantir a preservação das obras.',
    data: '10/04/2026',
    cor: '#FFF000',
  },
  {
    titulo: 'Horário Especial',
    mensagem:
      'No feriado da próxima sexta-feira, a biblioteca operará em regime de plantão, das 09h às 13h.',
    data: '08/04/2026',
    cor: '#FFFFFF',
  },
];

export default function Avisos({ navigation }) {
  const { width } = useWindowDimensions();

  const larguraCartao = Math.min(width * 0.78, 260);

  function abrirContato() {
    Alert.alert(
      'Fale Conosco',
      'Entre em contato com a equipe da biblioteca para tirar suas dúvidas.',
      [
        { text: 'Fechar', style: 'cancel' },
        {
          text: 'Enviar e-mail',
          onPress: () => {
            Linking.openURL(
              'mailto:biblioteca@jaboatao.ifpe.edu.br'
            ).catch(() =>
              Alert.alert(
                'Aviso',
                'Não foi possível abrir o aplicativo de e-mail.'
              )
            );
          },
        },
      ]
    );
  }

  function mostrarMaisRecente() {
    const aviso = [...avisos].sort((a, b) => {
      const [diaA, mesA, anoA] = a.data.split('/').map(Number);
      const [diaB, mesB, anoB] = b.data.split('/').map(Number);

      return (
        new Date(anoB, mesB - 1, diaB) -
        new Date(anoA, mesA - 1, diaA)
      );
    })[0];

    Alert.alert(
      'Aviso mais recente',
      `${aviso.titulo}\n\n${aviso.mensagem}\n\nData: ${aviso.data}`
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Image
            source={require('../assets/jucaa.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.menu}
            contentContainerStyle={styles.menuConteudo}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Avisos')}
              activeOpacity={0.8}
            >
              <Text style={[styles.menuTexto, styles.menuAtivo]}>
                AVISOS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.8}
            >
              <Text style={styles.menuTexto}>DESTAQUES</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Acervo')}
              activeOpacity={0.8}
            >
              <Text style={styles.menuTexto}>ACERVO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MinhasReservas')
              }
              activeOpacity={0.8}
            >
              <Text style={styles.menuTexto}>
                MINHAS RESERVAS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FeedLiterario')
              }
              activeOpacity={0.8}
            >
              <Text style={styles.menuTexto}>
                FEED LITERÁRIO
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* TÍTULO E BOTÃO MAIS RECENTES */}
        <View style={styles.cabecalhoAvisos}>
          <Text style={styles.tituloPagina}>
            Painel de Avisos:
          </Text>

          <TouchableOpacity
            style={styles.botaoRecente}
            activeOpacity={0.8}
            onPress={mostrarMaisRecente}
          >
            <Text style={styles.textoRecente}>
              Mais recentes
            </Text>

            <Text style={styles.setaRecente}>↓</Text>
          </TouchableOpacity>
        </View>

        {/* CARTÕES DE AVISOS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listaAvisos}
        >
          {avisos.map((aviso, index) => (
            <View
              key={index}
              style={[
                styles.cartao,
                { width: larguraCartao },
              ]}
            >
              <Text
                style={[
                  styles.tituloAviso,
                  { color: aviso.cor },
                ]}
              >
                {aviso.titulo}
              </Text>

              <Text
                style={[
                  styles.mensagemAviso,
                  { color: aviso.cor },
                ]}
              >
                {aviso.mensagem}
              </Text>

              <Text
                style={[
                  styles.dataAviso,
                  { color: aviso.cor },
                ]}
              >
                Data: {aviso.data}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.espacoInferior} />
      </ScrollView>

      {/* FALE CONOSCO */}
      <TouchableOpacity
        style={styles.botaoContato}
        onPress={abrirContato}
        activeOpacity={0.8}
      >
        <Text style={styles.textoContato}>
          Fale Conosco
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BC583',
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingBottom: 30,
  },

  // CABEÇALHO
  header: {
    minHeight: 165,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 12,
  },

  logo: {
    width: 100,
    height: 130,
  },

  menu: {
    flex: 1,
    marginLeft: 10,
  },

  menuConteudo: {
    alignItems: 'center',
    paddingRight: 45,
    gap: 22,
  },

  menuTexto: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  menuAtivo: {
    fontWeight: '900',
    textDecorationLine: 'none',
  },

  // TÍTULO E MAIS RECENTES
  cabecalhoAvisos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 28,
    marginHorizontal: 12,
    gap: 8,
  },

  tituloPagina: {
    flex: 1,
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
  },

  botaoRecente: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#194900',
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 12,
    gap: 5,
  },

  textoRecente: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  setaRecente: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  // CARTÕES
  listaAvisos: {
    paddingHorizontal: 25,
    paddingRight: 50,
    gap: 35,
  },

  cartao: {
    minHeight: 275,
    backgroundColor: '#194900',
    paddingHorizontal: 9,
    paddingVertical: 19,
    justifyContent: 'flex-start',
  },

  tituloAviso: {
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 20,
  },

  mensagemAviso: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    flexShrink: 1,
  },

  dataAviso: {
    fontSize: 14,
    fontWeight: '900',
    marginTop: 'auto',
    paddingTop: 20,
  },

  espacoInferior: {
    height: 65,
  },

  // FALE CONOSCO
  botaoContato: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    backgroundColor: '#202020',
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderWidth: 1,
    borderColor: '#555555',
  },

  textoContato: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
