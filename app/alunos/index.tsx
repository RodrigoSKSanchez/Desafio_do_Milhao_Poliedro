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

  const renderItem = ({ item }: { item: Aluno }) => {
    if (!item.usuario_aluno.toLowerCase().includes(filtro.toLowerCase())) return null;
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: tema.cards }]}
        onPress={() => abrirPerfilAluno(item.idAluno)}
      >
        <Text style={[styles.nome, { color: tema.texto }]}>{item.usuario_aluno}</Text>
      </TouchableOpacity>
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
        <TouchableOpacity onPress={carregarAlunos}>
          <Ionicons name="reload" size={35} color={tema.texto} />
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

      {/* Modal de perfil do aluno */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: tema.cards }]}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.fecharModal}>
              <Ionicons name="close" size={28} color="#F44" />
            </TouchableOpacity>

            {perfilAluno ? (
              <>
                <Text style={[styles.info, { color: tema.texto }]}>Email: {perfilAluno.email}</Text>
                <Text style={[styles.info, { color: tema.texto }]}>Dinheiro: R$ {perfilAluno.dinheiro.toLocaleString()}</Text>
                <Text style={[styles.info, { color: tema.texto }]}>Acertos: {perfilAluno.acertos}</Text>
                <Text style={[styles.info, { color: tema.texto }]}>Total de Perguntas: {perfilAluno.total}</Text>
                <Text style={[styles.info, { color: tema.texto }]}>Dicas: {perfilAluno.dica}</Text>
                <Text style={[styles.info, { color: tema.texto }]}>Pulos: {perfilAluno.pula}</Text>
                <Text style={[styles.info, { color: tema.texto }]}>Eliminações: {perfilAluno.elimina}</Text>
              </>
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
    gap: 10
  },
  fecharModal: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    zIndex: 1,
  },
  info: {
    fontSize: 18,
    marginTop: 8,
  },
});
