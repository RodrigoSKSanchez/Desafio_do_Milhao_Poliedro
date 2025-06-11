import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Aluno {
  idAluno: number;
  usuario_aluno: string;
}

interface PerfilAluno {
  email: string;
  dinheiro: number;
  acertos: number;
  total: number;
  dica: number;
  pula: number;
  elimina: number;
}

const ListaAlunos: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [perfilAluno, setPerfilAluno] = useState<PerfilAluno | null>(null);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [novoAluno, setNovoAluno] = useState({ usuario: '', senha: '', confirmar: '' });
  const [erroCadastro, setErroCadastro] = useState('');
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);

  const tema = {
    fundo: isDark ? '#000' : '#F7F7F7',
    texto: isDark ? '#fff' : '#000',
    cards: isDark ? '#2E2E54' : '#4C5C99',
    voltarBg: isDark ? '#444' : '#DDD'
  };

  const carregarAlunos = () => {
    setLoading(true);
    fetch('http://localhost:8000/alunos')
      .then(res => res.json())
      .then(data => setAlunos(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const abrirPerfilAluno = (idAluno: number) => {
    fetch(`http://localhost:8000/perfil_aluno?idAluno=${idAluno}`)
      .then(res => res.json())
      .then(data => {
        setPerfilAluno(data);
        setModalVisible(true);
      })
      .catch(err => {
        console.error(err);
        setPerfilAluno(null);
        setModalVisible(false);
      });
  };

  const handleCadastrarAluno = () => {
    if (!novoAluno.usuario || !novoAluno.senha || !novoAluno.confirmar) {
      setErroCadastro('Preencha todos os campos');
      return;
    }
    if (!novoAluno.usuario.endsWith('@p4ed.com')) {
      setErroCadastro('O usuário deve terminar com "@p4ed.com"');
      return;
    }
    if (novoAluno.senha !== novoAluno.confirmar) {
      setErroCadastro('As senhas não coincidem');
      return;
    }

    fetch('http://localhost:8000/cadastro_aluno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_aluno: novoAluno.usuario,
        senha_aluno: novoAluno.senha,
      }),
    })
      .then(res => {
        if (res.ok) {
          setModalCadastro(false);
          setNovoAluno({ usuario: '', senha: '', confirmar: '' });
          setErroCadastro('');
          carregarAlunos();
        } else {
          setErroCadastro('Erro ao cadastrar aluno');
        }
      })
      .catch(() => setErroCadastro('Erro de conexão com o servidor'));
  };

  const handleExcluirAluno = (id: number) => {
    fetch(`http://localhost:8000/excluir_aluno?idAluno=${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          setConfirmarExclusao(false);
          setIdParaExcluir(null);
          carregarAlunos();
        }
      })
      .catch(err => console.error(err));
  };

  const renderItem = ({ item }: { item: Aluno }) => {
    if (!item.usuario_aluno.toLowerCase().includes(filtro.toLowerCase())) return null;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: tema.cards, flex: 1 }]}
          onPress={() => abrirPerfilAluno(item.idAluno)}
        >
          <Text style={[styles.nome, { color: tema.texto }]}>{item.usuario_aluno}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setIdParaExcluir(item.idAluno); setConfirmarExclusao(true); }}>
          <Ionicons name="close-circle" size={28} color="#F44" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />

      <View style={[styles.topBar, { backgroundColor: tema.cards }]}>
        <TouchableOpacity onPress={() => router.push('/menu_professor')} style={[styles.botaoVoltar, { backgroundColor: tema.voltarBg }]}>
          <Ionicons name="arrow-back" size={24} color={tema.texto} />
        </TouchableOpacity>
        <Text style={[styles.titulo, { color: tema.texto }]}>Alunos</Text>
        <TouchableOpacity onPress={() => setModalCadastro(true)} style={{ backgroundColor: '#4CAF50', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cadastrar aluno</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.filtros}>
        <TextInput
          placeholder="Buscar aluno..."
          placeholderTextColor="#999"
          style={[styles.input, { color: tema.texto, borderColor: tema.texto }]}
          value={filtro}
          onChangeText={setFiltro}
        />
        <TouchableOpacity onPress={carregarAlunos}>
          <Ionicons name="reload" size={30} color={tema.texto} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3399ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.idAluno.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}

      {/* Modal de cadastro */}
      <Modal visible={modalCadastro} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: tema.cards }]}>
            <TouchableOpacity onPress={() => setModalCadastro(false)} style={styles.fecharModal}>
              <Ionicons name="close" size={28} color="#F44" />
            </TouchableOpacity>
            <Text style={[styles.modalTitulo, { color: tema.texto }]}>Cadastrar Novo Aluno</Text>
            <TextInput placeholder="Usuário (ex: RA@p4ed.com)" placeholderTextColor="#aaa" style={[styles.input, { color: tema.texto, borderBottomColor: tema.texto }]} value={novoAluno.usuario} onChangeText={(t) => setNovoAluno({ ...novoAluno, usuario: t })} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput placeholder="Senha" placeholderTextColor="#aaa" secureTextEntry={!mostrarSenha} style={[styles.input, { flex: 1, color: tema.texto, borderBottomColor: tema.texto }]} value={novoAluno.senha} onChangeText={(t) => setNovoAluno({ ...novoAluno, senha: t })} />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color={tema.texto} style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
            <TextInput placeholder="Confirmar Senha" placeholderTextColor="#aaa" secureTextEntry={!mostrarSenha} style={[styles.input, { color: tema.texto, borderBottomColor: tema.texto }]} value={novoAluno.confirmar} onChangeText={(t) => setNovoAluno({ ...novoAluno, confirmar: t })} />
            {erroCadastro ? <Text style={{ color: 'red', textAlign: 'center' }}>{erroCadastro}</Text> : null}
            <TouchableOpacity onPress={handleCadastrarAluno} style={[styles.card, { backgroundColor: '#4CAF50', marginTop: 20 }]}>
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal visible={confirmarExclusao} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: tema.cards }]}>
            <Text style={[styles.modalTitulo, { color: tema.texto }]}>Confirmar Exclusão</Text>
            <Text style={[styles.info, { color: tema.texto }]}>Tem certeza que deseja excluir este aluno?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <TouchableOpacity onPress={() => setConfirmarExclusao(false)} style={[styles.card, { backgroundColor: '#AAA' }]}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => idParaExcluir && handleExcluirAluno(idParaExcluir)} style={[styles.card, { backgroundColor: '#F44' }]}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de perfil do aluno */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: tema.cards }]}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.fecharModal}>
              <Ionicons name="close" size={28} color="#F44" />
            </TouchableOpacity>
            {perfilAluno ? (
              <View>
                <Text style={[styles.modalTitulo, { color: tema.texto }]}>Informações do Aluno</Text>
                <View style={styles.secao}>
                  <Text style={[styles.info, { color: tema.texto }]}>Email: {perfilAluno.email}</Text>
                  <Text style={[styles.info, { color: tema.texto }]}>Dinheiro: R$ {perfilAluno.dinheiro.toLocaleString()}</Text>
                  <Text style={[styles.info, { color: tema.texto }]}>Acertos: {perfilAluno.acertos}</Text>
                  <Text style={[styles.info, { color: tema.texto }]}>Total de Perguntas: {perfilAluno.total}</Text>
                </View>
                <Text style={[styles.modalTitulo, { color: tema.texto }]}>Inventário</Text>
                <View style={styles.inventarioContainer}>
                  <View style={styles.itemInventario}><Text style={[styles.inventarioTitulo, { color: tema.texto }]}>Dicas</Text><Text style={[styles.inventarioValor, { color: tema.texto }]}>{perfilAluno.dica}</Text></View>
                  <View style={styles.itemInventario}><Text style={[styles.inventarioTitulo, { color: tema.texto }]}>Pulos</Text><Text style={[styles.inventarioValor, { color: tema.texto }]}>{perfilAluno.pula}</Text></View>
                  <View style={styles.itemInventario}><Text style={[styles.inventarioTitulo, { color: tema.texto }]}>Eliminações</Text><Text style={[styles.inventarioValor, { color: tema.texto }]}>{perfilAluno.elimina}</Text></View>
                </View>
              </View>
            ) : (
              <Text style={[styles.info, { color: tema.texto }]}>Erro ao carregar informações.</Text>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ListaAlunos;

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'center', width: '100%' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 25, paddingHorizontal: 20 },
  botaoVoltar: { padding: 6, borderRadius: 12 },
  titulo: { fontSize: 20, fontWeight: 'bold' },
  filtros: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 60, marginVertical: 20 },
  input: { flex: 1, borderBottomWidth: 1, fontSize: 20, paddingVertical: 4 },
  lista: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { padding: 10, borderRadius: 12, marginBottom: 12 },
  nome: { fontSize: 18, fontWeight: '500' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    width: '85%',
    borderRadius: 16,
    padding: 20,
    gap: 10,
    maxWidth: 400,
  },
  fecharModal: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    zIndex: 1,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  secao: {
    gap: 8,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 4,
  },
  inventarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  itemInventario: {
    alignItems: 'center',
    padding: 8,
    minWidth: 80,
  },
  inventarioTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  inventarioValor: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
