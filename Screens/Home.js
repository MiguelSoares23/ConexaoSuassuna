
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>

      {/* CONTEÚDO COM ROLAGEM */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
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
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Avisos')}
            >
              <Text style={styles.menuTexto}>
                AVISOS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={[styles.menuTexto, styles.menuAtivo]}>
                DESTAQUES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Acervo')}
              activeOpacity={0.8}
            >
              <Text style={styles.menuTexto}>
                ACERVO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('MinhasReservas')}
            >
              <Text style={styles.menuTexto}>
                MINHAS RESERVAS
              </Text>
            </TouchableOpacity>

            {/* FEED LITERÁRIO */}
            <TouchableOpacity
              onPress={() => navigation.navigate('FeedLiterario')}
              activeOpacity={0.8}
            >
              <Text style={styles.menuTexto}>
                FEED LITERÁRIO
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>

        {/* PESQUISA */}
        <View style={styles.pesquisaContainer}>
          <TextInput
            style={styles.pesquisa}
            placeholder="Pesquisar livros..."
            placeholderTextColor="#B8C9B0"
          />

          <Text style={styles.lupa}>
            🔍
          </Text>
        </View>

        {/* LIVROS POPULARES */}
        <View style={styles.secao}>

          <Text style={styles.tituloSecao}>
            Livros Populares:
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaLivros}
          >

            {/* LIVRO 1 */}
            <TouchableOpacity style={styles.cardLivro}>
              <Image
                source={{
                  uri: 'https://covers.openlibrary.org/b/isbn/9788535914849-L.jpg'
                }}
                style={styles.capa}
              />
            </TouchableOpacity>

            {/* LIVRO 2 */}
            <TouchableOpacity style={styles.cardLivro}>
              <Image
                source={{
                  uri: 'https://covers.openlibrary.org/b/isbn/9788563560141-L.jpg'
                }}
                style={styles.capa}
              />
            </TouchableOpacity>

            {/* LIVRO 3 */}
            <TouchableOpacity style={styles.cardLivro}>
              <Image
                source={{
                  uri: 'https://covers.openlibrary.org/b/isbn/9788532505704-L.jpg'
                }}
                style={styles.capa}
              />
            </TouchableOpacity>

            {/* LIVRO 4 */}
            <TouchableOpacity style={styles.cardLivro}>
              <Image
                source={{
                  uri: 'https://covers.openlibrary.org/b/isbn/9788532530782-L.jpg'
                }}
                style={styles.capa}
              />
            </TouchableOpacity>

            {/* LIVRO 5 */}
            <TouchableOpacity style={styles.cardLivro}>
              <Image
                source={{
                  uri: 'https://covers.openlibrary.org/b/isbn/9781449337711-L.jpg'
                }}
                style={styles.capa}
              />
            </TouchableOpacity>

          </ScrollView>
        </View>

        {/* AVISOS RECENTES */}
        <View style={styles.secaoAvisos}>

          <Text style={styles.tituloSecao}>
            Avisos Recentes:
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaAvisos}
          >

            <View style={styles.cardAviso}>
              <Text style={styles.textoAviso}>
                📚 Novidades no Acervo:{'\n'}
                Novos mundos chegaram! Confira os últimos livros cadastrados!
              </Text>
            </View>

            <View style={styles.cardAviso}>
              <Text style={styles.textoAviso}>
                ⏳ Lembrete de Prazo:{'\n'}
                Não deixe para a última hora. Renove suas reservas hoje mesmo.
              </Text>
            </View>

            <View style={styles.cardAviso}>
              <Text style={styles.textoAviso}>
                📖 Destaque da Semana:{'\n'}
                Livro recomendado da semana. Confira no acervo!
              </Text>
            </View>

            <View style={styles.cardAviso}>
              <Text style={styles.textoAviso}>
                📅 Funcionamento:{'\n'}
                Atenção ao horário. Confira o expediente da biblioteca.
              </Text>
            </View>

            <View style={styles.cardAviso}>
              <Text style={styles.textoAviso}>
                ⚠️ Regularização:{'\n'}
                Comunicado sobre multas. Saiba como ficar em dia.
              </Text>
            </View>

            <View style={styles.cardAviso}>
              <Text style={styles.textoAviso}>
                📚 Espaço TCC:{'\n'}
                Entrega de trabalhos acadêmicos. Orientações para o depósito.
              </Text>
            </View>

          </ScrollView>
        </View>

        {/* ESPAÇO ANTES DO RODAPÉ */}
        <View style={styles.espacoFooter} />

      </ScrollView>

      {/* RODAPÉ FIXO */}
      <View style={styles.footer}>

        <Text style={styles.footerTexto}>
          Biblioteca Ariano Suassuna
        </Text>

        <Text style={styles.footerSubtexto}>
          IFPE - Campus Jaboatão dos Guararapes
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#9BC583',
  },

  scrollView: {
    flex: 1,
  },

  scroll: {
    paddingBottom: 0,
  },

  // CABEÇALHO
  header: {
    width: '100%',
    minHeight: 105,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 8,
  },

  logo: {
    width: 135,
    height: 100,
    resizeMode: 'contain',
  },

  menu: {
    flex: 1,
    marginLeft: 5,
  },

  menuConteudo: {
    alignItems: 'center',
    paddingRight: 10,
  },

  menuTexto: {
    fontSize: 12,
    color: '#000',
    marginHorizontal: 9,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  menuAtivo: {
    fontWeight: '900',
    textDecorationLine: 'none',
  },

  // PESQUISA
  pesquisaContainer: {
    height: 40,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  pesquisa: {
    flex: 1,
    height: 38,
    backgroundColor: '#145000',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingRight: 45,
    color: '#fff',
    fontSize: 14,
  },

  lupa: {
    position: 'absolute',
    right: 14,
    fontSize: 17,
  },

  // SEÇÕES
  secao: {
    marginTop: 5,
  },

  secaoAvisos: {
    marginTop: 35,
  },

  tituloSecao: {
    fontSize: 21,
    fontWeight: '900',
    color: '#000',
    marginLeft: 25,
    marginBottom: 14,
  },

  // LIVROS
  listaLivros: {
    paddingHorizontal: 8,
  },

  cardLivro: {
    width: 115,
    height: 145,
    backgroundColor: '#145000',
    marginHorizontal: 6,
    borderRadius: 3,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  capa: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // AVISOS
  listaAvisos: {
    paddingHorizontal: 8,
  },

  cardAviso: {
    width: 175,
    minHeight: 105,
    backgroundColor: '#145000',
    marginHorizontal: 6,
    padding: 9,
    borderRadius: 3,
    justifyContent: 'center',
  },

  textoAviso: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },

  // ESPAÇO ANTES DO RODAPÉ
  espacoFooter: {
    height: 25,
  },

  // RODAPÉ FIXO
  footer: {
    width: '100%',
    height: 70,
    backgroundColor: '#145000',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  footerTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },

  footerSubtexto: {
    color: '#fff',
    fontSize: 10,
    marginTop: 4,
  },

});
