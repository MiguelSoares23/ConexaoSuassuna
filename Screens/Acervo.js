import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Alert,
} from 'react-native';

const livros = [
  { titulo: 'Orgulho e Preconceito', autor: 'Jane Austen', genero: 'Romance' },
  { titulo: 'Drácula', autor: 'Bram Stoker', genero: 'Terror' },
  { titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance' },
  { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', genero: 'Fantasia' },
  { titulo: 'Clean Code', autor: 'Robert C. Martin', genero: 'Tecnologia' },
  { titulo: 'Como Eu Era Antes de Você', autor: 'Jojo Moyes', genero: 'Romance' },
  { titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', genero: 'Fantasia' },
  { titulo: 'A Culpa é das Estrelas', autor: 'John Green', genero: 'Romance' },
  { titulo: 'O Cortiço', autor: 'Aluísio Azevedo', genero: 'Clássico' },
  { titulo: 'O Iluminado', autor: 'Stephen King', genero: 'Terror' },
  { titulo: 'O Programador Pragmático', autor: 'Andrew Hunt e David Thomas', genero: 'Tecnologia' },
];

const categorias = [
  { nome: 'Gênero', valor: 'genero' },
  { nome: 'Autor', valor: 'autor' },
  { nome: 'Título', valor: 'titulo' },
];

export default function Acervo({ navigation }) {
  const [pesquisa, setPesquisa] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [valorSelecionado, setValorSelecionado] = useState('');
  const [opcoesAbertas, setOpcoesAbertas] = useState(false);

  const { width } = useWindowDimensions();
  const colunas = width >= 1100 ? 6 : width >= 750 ? 4 : 2;

  const campoPesquisa = tipoFiltro || 'todos';

  const placeholderPesquisa = {
    todos: 'Pesquisar livro, autor ou gênero...',
    genero: 'Pesquisar gênero...',
    autor: 'Pesquisar autor...',
    titulo: 'Pesquisar título...',
  };

  // Cria automaticamente as opções disponíveis
  const opcoesFiltro = tipoFiltro
    ? [
        ...new Set(
          livros
            .map((livro) => livro[tipoFiltro])
            .filter(Boolean)
        ),
      ].sort((a, b) => a.localeCompare(b, 'pt-BR'))
    : [];

  // Filtra os livros pela opção escolhida e pela pesquisa
  const livrosFiltrados = livros.filter((livro) => {
    const termo = pesquisa.trim().toLocaleLowerCase('pt-BR');

    const correspondeOpcao =
      !valorSelecionado ||
      String(livro[tipoFiltro] || '').toLocaleLowerCase('pt-BR') ===
        valorSelecionado.toLocaleLowerCase('pt-BR');

    let correspondePesquisa = true;

    if (termo) {
      if (campoPesquisa === 'autor') {
        correspondePesquisa = livro.autor
          .toLocaleLowerCase('pt-BR')
          .includes(termo);
      } else if (campoPesquisa === 'titulo') {
        correspondePesquisa = livro.titulo
          .toLocaleLowerCase('pt-BR')
          .includes(termo);
      } else if (campoPesquisa === 'genero') {
        correspondePesquisa = livro.genero
          .toLocaleLowerCase('pt-BR')
          .includes(termo);
      } else {
        correspondePesquisa =
          livro.titulo.toLocaleLowerCase('pt-BR').includes(termo) ||
          livro.autor.toLocaleLowerCase('pt-BR').includes(termo) ||
          livro.genero.toLocaleLowerCase('pt-BR').includes(termo);
      }
    }

    return correspondeOpcao && correspondePesquisa;
  });

  function selecionarCategoria(categoria) {
    setTipoFiltro(categoria);
    setValorSelecionado('');
    setPesquisa('');
    setOpcoesAbertas(true);
  }

  function selecionarOpcao(opcao) {
    setValorSelecionado(opcao);
    setPesquisa('');
    setOpcoesAbertas(false);
  }

  function limparFiltros() {
    setPesquisa('');
    setTipoFiltro('');
    setValorSelecionado('');
    setOpcoesAbertas(false);
  }

  function abrirLivro(livro) {
    Alert.alert(
      livro.titulo,
      `Autor: ${livro.autor}\nGênero: ${livro.genero}`,
      [{ text: 'Fechar' }]
    );
  }

  function navegarPara(tela) {
    if (tela === 'Acervo') return;

    if (navigation && navigation.navigate) {
      navigation.navigate(tela);
    } else {
      Alert.alert(
        'Navegação',
        `A tela "${tela}" não está disponível no navegador.`
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* CABEÇALHO */}
        <View style={styles.cabecalho}>
          <View style={styles.areaLogo}>
            <Image
              source={require('../assets/jucaa.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.menu}
          >
            {[
              'AVISOS',
              'DESTAQUES',
              'ACERVO',
              'MINHAS RESERVAS',
              'FEED LITERÁRIO',
            ].map((item) => {
              const telas = {
                AVISOS: 'Avisos',
                DESTAQUES: 'Home',
                ACERVO: 'Acervo',
                'MINHAS RESERVAS': 'MinhasReservas',
                'FEED LITERÁRIO': 'FeedLiterario',
              };

              return (
                <TouchableOpacity
                  key={item}
                  style={styles.menuItem}
                  activeOpacity={0.8}
                  onPress={() => navegarPara(telas[item])}
                >
                  <Text
                    style={[
                      styles.menuTexto,
                      item === 'ACERVO' && styles.menuAtivo,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* PESQUISA */}
        <View style={styles.pesquisaContainer}>
          <TextInput
            style={styles.pesquisaInput}
            value={pesquisa}
            onChangeText={setPesquisa}
            placeholder={placeholderPesquisa[campoPesquisa]}
            placeholderTextColor="#DDE8D5"
            returnKeyType="search"
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity onPress={() => setPesquisa('')}>
              <Text style={styles.limparPesquisa}>X</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.lupa}>⌕</Text>
        </View>

        {/* CATEGORIAS DE FILTRO */}
        <View style={styles.areaCategoria}>
          <View style={styles.opcoesCategoria}>
            {categorias.map((categoria) => {
              const selecionada = tipoFiltro === categoria.valor;

              return (
                <TouchableOpacity
                  key={categoria.valor}
                  style={[
                    styles.botaoCategoria,
                    selecionada && styles.botaoCategoriaSelecionado,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => selecionarCategoria(categoria.valor)}
                >
                  <Text
                    style={[
                      styles.textoOpcaoCategoria,
                      selecionada && styles.textoOpcaoSelecionada,
                    ]}
                  >
                    {categoria.nome}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* OPÇÕES DA CATEGORIA ESCOLHIDA */}
        {opcoesAbertas && tipoFiltro !== '' && (
          <View style={styles.listaOpcoes}>
            <Text style={styles.tituloOpcoes}>
              {tipoFiltro === 'genero'
                ? 'Escolha um gênero'
                : tipoFiltro === 'autor'
                ? 'Escolha um autor'
                : 'Escolha um título'}
            </Text>

            <TouchableOpacity
              style={[
                styles.itemOpcao,
                valorSelecionado === '' && styles.itemOpcaoSelecionado,
              ]}
              onPress={() => selecionarOpcao('')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.textoItemOpcao,
                  valorSelecionado === '' && styles.textoItemOpcaoAtivo,
                ]}
              >
                Todos
              </Text>
            </TouchableOpacity>

            <View style={styles.divisorOpcoes} />

            <ScrollView
              style={styles.scrollOpcoes}
              nestedScrollEnabled
              showsVerticalScrollIndicator
            >
              {opcoesFiltro.map((opcao) => {
                const selecionada = valorSelecionado === opcao;

                return (
                  <TouchableOpacity
                    key={opcao}
                    style={[
                      styles.itemOpcao,
                      selecionada && styles.itemOpcaoSelecionado,
                    ]}
                    onPress={() => selecionarOpcao(opcao)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.textoItemOpcao,
                        selecionada && styles.textoItemOpcaoAtivo,
                      ]}
                    >
                      {opcao}
                    </Text>

                    {selecionada && (
                      <Text style={styles.marcaSelecao}>✓</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* FILTRO ATUAL */}
        {(valorSelecionado !== '' || pesquisa !== '') && (
          <View style={styles.filtroAtual}>
            <Text style={styles.textoFiltroAtual}>
              {valorSelecionado
                ? `Filtro: ${valorSelecionado}`
                : `Pesquisa: ${pesquisa}`}
            </Text>

            <TouchableOpacity onPress={limparFiltros}>
              <Text style={styles.limparFiltro}>Limpar filtros ✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* LISTA DE LIVROS */}
        <Text style={styles.titulo}>Lista de Livros:</Text>

        <Text style={styles.resultado}>
          {livrosFiltrados.length} livro(s) encontrado(s)
        </Text>

        <View style={styles.grade}>
          {livrosFiltrados.map((livro, index) => (
            <TouchableOpacity
              key={`${livro.titulo}-${index}`}
              style={[
                styles.cardLivro,
                { width: `${100 / colunas - 1.5}%` },
              ]}
              activeOpacity={0.8}
              onPress={() => abrirLivro(livro)}
            >
              <View style={styles.molduraCapa}>
                <Image
                  source={require('../assets/jucaa.png')}
                  style={styles.capa}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.textoLivro}>{livro.titulo}</Text>

              <Text style={styles.textoAutor}>
                Autor: {livro.autor}
              </Text>

              <Text style={styles.textoGenero}>
                Gênero: {livro.genero}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {livrosFiltrados.length === 0 && (
          <Text style={styles.semResultado}>
            Nenhum livro encontrado.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BC583',
  },

  scroll: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  cabecalho: {
    minHeight: 145,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  // LOGO SEM BORDA
  areaLogo: {
    width: 72,
    height: 115,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  logo: {
    width: 68,
    height: 90,
  },

  menu: {
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 5,
  },

  menuItem: {
    paddingVertical: 10,
  },

  menuTexto: {
    color: '#000',
    fontSize: 12,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

  menuAtivo: {
    fontWeight: '900',
    textDecorationLine: 'none',
  },

  pesquisaContainer: {
    height: 44,
    backgroundColor: '#145000',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 8,
    marginBottom: 22,
  },

  pesquisaInput: {
    flex: 1,
    height: 44,
    color: '#fff',
    fontSize: 15,
  },

  limparPesquisa: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },

  lupa: {
    color: '#145000',
    backgroundColor: '#fff',
    width: 23,
    height: 23,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 23,
    fontSize: 20,
    fontWeight: 'bold',
  },

  areaCategoria: {
    marginBottom: 16,
  },

  opcoesCategoria: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  botaoCategoria: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#145000',
    backgroundColor: 'transparent',
  },

  botaoCategoriaSelecionado: {
    backgroundColor: '#145000',
  },

  textoOpcaoCategoria: {
    color: '#145000',
    fontSize: 14,
    fontWeight: '600',
  },

  textoOpcaoSelecionada: {
    color: '#fff',
  },

  listaOpcoes: {
    backgroundColor: '#F5F8F1',
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#145000',
  },

  tituloOpcoes: {
    color: '#145000',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  scrollOpcoes: {
    maxHeight: 210,
  },

  itemOpcao: {
    minHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemOpcaoSelecionado: {
    backgroundColor: '#DCEAD4',
  },

  textoItemOpcao: {
    flex: 1,
    color: '#222',
    fontSize: 14,
  },

  textoItemOpcaoAtivo: {
    color: '#145000',
    fontWeight: 'bold',
  },

  marcaSelecao: {
    color: '#145000',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 8,
  },

  divisorOpcoes: {
    height: 1,
    backgroundColor: '#D7E2D0',
    marginVertical: 4,
  },

  filtroAtual: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },

  textoFiltroAtual: {
    color: '#23451A',
    fontSize: 12,
  },

  limparFiltro: {
    color: '#145000',
    fontSize: 12,
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
    marginTop: 8,
    marginBottom: 8,
  },

  resultado: {
    color: '#23451A',
    fontSize: 13,
    marginBottom: 18,
  },

  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  cardLivro: {
    marginBottom: 28,
    alignItems: 'center',
  },

  molduraCapa: {
    width: '100%',
    height: 120,
    padding: 5,
    backgroundColor: '#145000',
    borderRadius: 5,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  capa: {
    width: '100%',
    height: '100%',
  },

  textoLivro: {
    color: '#000',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  textoAutor: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },

  textoGenero: {
    color: '#23451A',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },

  semResultado: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 30,
    color: '#000',
  },
});
