import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type Pergunta = {
  idPergunta: number;
  texto_enunciado: string;
  ano: number;
  dica: string;
  alternativa_A: string;
  alternativa_B: string;
  alternativa_C: string;
  alternativa_CORRETA: string;
};

export default function ConfigProfScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tema = {
    fundo: isDark ? '#000' : '#F7F7F7',
    texto: isDark ? '#fff' : '#000',
    cards: isDark ? '#2E2E54' : '#4C5C99',
    voltarBg: isDark ? '#444' : '#DDD',
    botao: isDark ? '#4CAF50' : '#2E8B57',
    apagar: '#B22222',
  };

  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroAno, setFiltroAno] = useState<number | null>(null);
  const [modalCriar, setModalCriar] = useState(false);
  const [modalFiltro, setModalFiltro] = useState(false);

  const [novaPergunta, setNovaPergunta] = useState({
    texto_enunciado: '',
    dica: '',
    ano: 8,
    alternativa_A: '',
    alternativa_B: '',
    alternativa_C: '',
    alternativa_CORRETA: '',
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/perguntas")
      .then((res) => res.json())
      .then((data) => setPerguntas(data))
      .catch((err) => console.error("Erro ao carregar perguntas:", err));
  }, []);

  const perguntasFiltradas = perguntas.filter((p) =>
    p.texto_enunciado.toLowerCase().includes(filtroTexto.toLowerCase()) &&
    (filtroAno === null || p.ano === filtroAno)
  );

  const handleCriarPergunta = () => {
    setModalCriar(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />

      <View style={[styles.topBar, { backgroundColor: tema.cards }]}>
        <TouchableOpacity onPress={() => router.push('/menu_professor')} style={[styles.botaoVoltar, { backgroundColor: tema.voltarBg }]}>
          <Ionicons name="arrow-back" size={24} color={tema.texto} />
        </TouchableOpacity>
        <Text style={[styles.titulo, { color: tema.texto }]}>Perguntas</Text>
        <TouchableOpacity onPress={() => setModalCriar(true)}>
          <Ionicons name="add" size={45} color="#47E332" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtros}>
        <TextInput
          placeholder="Buscar título..."
          placeholderTextColor="#999"
          style={[styles.input, { color: tema.texto, borderColor: tema.texto }]}
          value={filtroTexto}
          onChangeText={setFiltroTexto}
        />
        <TouchableOpacity onPress={() => setModalFiltro(true)}>
          <Ionicons name="filter" size={24} color={tema.texto} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={perguntasFiltradas}
        keyExtractor={(item) => item.idPergunta.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: tema.cards }]}>
            <Text style={[styles.cardTitulo, { color: tema.texto }]}>
              ({item.idPergunta}) {item.texto_enunciado}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal Filtro */}
      <Modal visible={modalFiltro} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Filtrar por Ano</Text>
            <View style={styles.anoContainer}>
              {[8, 9, 10, 11, 12].map((a) => (
                <TouchableOpacity key={a} style={[styles.anoBotao, { backgroundColor: filtroAno === a ? '#4CAF50' : '#ccc' }]} onPress={() => { setFiltroAno(a); setModalFiltro(false); }}>
                  <Text style={styles.anoTexto}>{a}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={[styles.anoBotao, { backgroundColor: filtroAno === null ? '#4CAF50' : '#ccc' }]} onPress={() => { setFiltroAno(null); setModalFiltro(false); }}>
                <Text style={styles.anoTexto}>Todos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Criar */}
      <Modal visible={modalCriar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <ScrollView>
              <Text style={styles.modalTitulo}>Nova Pergunta</Text>
              <TextInput placeholder="Enunciado" style={styles.modalInput} value={novaPergunta.texto_enunciado} onChangeText={(t) => setNovaPergunta({ ...novaPergunta, texto_enunciado: t })} />
              <TextInput placeholder="Dica" style={styles.modalInput} value={novaPergunta.dica} onChangeText={(t) => setNovaPergunta({ ...novaPergunta, dica: t })} />
              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Ano:</Text>
              <View style={styles.anoContainer}>
                {[8, 9, 10, 11, 12].map((a) => (
                  <TouchableOpacity key={a} style={[styles.anoBotao, { backgroundColor: novaPergunta.ano === a ? '#4CAF50' : '#ccc' }]} onPress={() => setNovaPergunta({ ...novaPergunta, ano: a })}>
                    <Text style={styles.anoTexto}>{a}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput placeholder="Alternativa A" style={styles.modalInput} value={novaPergunta.alternativa_A} onChangeText={(t) => setNovaPergunta({ ...novaPergunta, alternativa_A: t })} />
              <TextInput placeholder="Alternativa B" style={styles.modalInput} value={novaPergunta.alternativa_B} onChangeText={(t) => setNovaPergunta({ ...novaPergunta, alternativa_B: t })} />
              <TextInput placeholder="Alternativa C" style={styles.modalInput} value={novaPergunta.alternativa_C} onChangeText={(t) => setNovaPergunta({ ...novaPergunta, alternativa_C: t })} />
              <TextInput placeholder="Alternativa Correta" style={styles.modalInput} value={novaPergunta.alternativa_CORRETA} onChangeText={(t) => setNovaPergunta({ ...novaPergunta, alternativa_CORRETA: t })} />
              <View style={styles.modalBotoes}>
                <TouchableOpacity onPress={handleCriarPergunta} style={styles.modalConfirmar}>
                  <Text style={styles.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalCriar(false)} style={styles.modalCancelar}>
                  <Text style={styles.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'center', width: '100%' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 25, paddingHorizontal: 20 },
  botaoVoltar: { padding: 6, borderRadius: 12 },
  titulo: { fontSize: 20, fontWeight: 'bold' },
  filtros: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 60, marginVertical: 10 },
  input: { flex: 1, borderBottomWidth: 1, fontSize: 16, paddingVertical: 4},
  lista: { paddingHorizontal: 60, paddingBottom: 20 },
  card: { padding: 12, borderRadius: 12, marginBottom: 10 },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalBox: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalInput: { borderBottomWidth: 1, marginBottom: 12, fontSize: 16 },
  anoContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 10, gap: 10 },
  anoBotao: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, minWidth: 50, alignItems: 'center' },
  anoTexto: { color: '#000', fontWeight: 'bold' },
  modalBotoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  modalConfirmar: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8 },
  modalCancelar: { backgroundColor: '#888', padding: 10, borderRadius: 8 },
  modalBotaoTexto: { color: '#FFF', fontWeight: 'bold' },
});