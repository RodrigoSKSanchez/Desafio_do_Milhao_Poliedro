import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Aluno {
  idAluno: number;
  usuario_aluno: string;
}

const ListaAlunos: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

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

  const renderItem = ({ item }: { item: Aluno }) => {
    if (!item.usuario_aluno.toLowerCase().includes(filtro.toLowerCase())) return null;
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: tema.cards }]}
        onPress={() => router.push(`/alunos/${item.idAluno}`)}
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
});
