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
  const [modalDetalhes, setModalDetalhes] = useState<Pergunta | null>(null);
  const [erroCampos, setErroCampos] = useState(false);
  
  const [modalEditar, setModalEditar] = useState<Pergunta | null>(null);

  const handleSalvarEdicao = async () => {
    if (!modalEditar) return;
    const camposVazios = !modalEditar.texto_enunciado || !modalEditar.dica || !modalEditar.alternativa_A || !modalEditar.alternativa_B || !modalEditar.alternativa_C || !modalEditar.alternativa_CORRETA;
    if (camposVazios) {
      setErroEdicao(true);
      return;
    }
    setErroEdicao(false);
    try {
      const response = await fetch(`http://127.0.0.1:8000/perguntas/${modalEditar.idPergunta}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalEditar),
      });
      if (response.ok) {
        setModalEditar(null);
        carregarPerguntas();
      } else {
        setErroEdicao(true);
      }
    } catch (err) {
      console.error("Erro ao editar pergunta:", err);
      setErroEdicao(true);
    }
  };

  const [erroEdicao, setErroEdicao] = useState(false);
  const [modalConfirmarExclusao, setModalConfirmarExclusao] = useState(false);
  const [perguntaParaExcluir, setPerguntaParaExcluir] = useState<Pergunta | null>(null);


  const [novaPergunta, setNovaPergunta] = useState({
    texto_enunciado: '',
    dica: '',
    ano: 8,
    alternativa_A: '',
    alternativa_B: '',
    alternativa_C: '',
    alternativa_CORRETA: '',
  });

  
  const confirmarExclusao = (pergunta: Pergunta) => {
    setPerguntaParaExcluir(pergunta);
    setModalConfirmarExclusao(true);
  };

  const excluirPergunta = async () => {
    if (!perguntaParaExcluir) return;
    try {
      await fetch(`http://127.0.0.1:8000/perguntas/${perguntaParaExcluir.idPergunta}`, {
        method: 'DELETE'
      });
      setModalConfirmarExclusao(false);
      setPerguntaParaExcluir(null);
      fetch("http://127.0.0.1:8000/perguntas")
        .then((res) => res.json())
        .then((data) => setPerguntas(data));
    } catch (err) {
      console.error('Erro ao excluir pergunta:', err);
    }
  };

    useEffect(() => {
    carregarPerguntas();
  }, []);

  const carregarPerguntas = () => {
  fetch("http://127.0.0.1:8000/perguntas")
      .then((res) => res.json())
      .then((data) => setPerguntas(data))
      .catch((err) => console.error("Erro ao carregar perguntas:", err));
  };

  const perguntasFiltradas = perguntas.filter(
    (p) =>
      p?.texto_enunciado?.toLowerCase().includes(filtroTexto.toLowerCase?.() || '') &&
      (filtroAno === null || p.ano === filtroAno)
  );


const handleCriarPergunta = async () => {
  const campos = novaPergunta;
  const camposVazios = !campos.texto_enunciado || !campos.dica || !campos.alternativa_A || !campos.alternativa_B || !campos.alternativa_C || !campos.alternativa_CORRETA;

  if (camposVazios) {
    setErroCampos(true);
    return;
  }

  setErroCampos(false);

  try {
    const response = await fetch("http://127.0.0.1:8000/perguntas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaPergunta),
    });

    if (response.ok) {
      await carregarPerguntas();
      setNovaPergunta({
        texto_enunciado: '',
        dica: '',
        ano: 8,
        alternativa_A: '',
        alternativa_B: '',
        alternativa_C: '',
        alternativa_CORRETA: '',
      });
      setModalCriar(false);
    } else {
      console.warn("Erro ao salvar:", await response.text());
      setErroCampos(true);
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    setErroCampos(true);
  }
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
        <TouchableOpacity onPress={carregarPerguntas}>
          <Ionicons name="reload" size={35} color={tema.texto} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalFiltro(true)}>
          <Ionicons name="filter" size={35} color={tema.texto} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={perguntasFiltradas}
        keyExtractor={(item) => item.idPergunta.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => setModalEditar(item)}
                style={[styles.card, { backgroundColor: tema.cards }]}
              >
                <Text style={[styles.cardTitulo, { color: tema.texto }]}>
                  {item.texto_enunciado}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => { setPerguntaParaExcluir(item); setModalConfirmarExclusao(true); }}
              style={{ alignSelf: 'center' }}
            >
              <Ionicons name="close-circle" size={28} color="#F44" />
            </TouchableOpacity>
          </View>
        )}

      />

      {/* Modal Filtro */}
      <Modal visible={modalFiltro} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={() => setModalFiltro(false)} style={styles.modalFechar}>
              <Text style={{ color: '#f00', fontWeight: 'bold', fontSize: 18 }}>X</Text>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => setModalCriar(false)} style={styles.modalFechar}>
              <Text style={{ color: '#f00', fontWeight: 'bold', fontSize: 18 }}>X</Text>
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.modalTitulo}>Nova Pergunta</Text>

              <Text style={styles.modalLabel}>Enunciado:</Text>
              <TextInput
                placeholder="Digite o enunciado"
                style={[styles.modalInput, erroCampos && !novaPergunta.texto_enunciado && styles.inputErro]}
                value={novaPergunta.texto_enunciado}
                onChangeText={(t) => setNovaPergunta({ ...novaPergunta, texto_enunciado: t })}
              />

              <Text style={styles.modalLabel}>Dica:</Text>
              <TextInput
                placeholder="Digite a dica"
                style={[styles.modalInput, erroCampos && !novaPergunta.dica && styles.inputErro]}
                value={novaPergunta.dica}
                onChangeText={(t) => setNovaPergunta({ ...novaPergunta, dica: t })}
              />

              <Text style={styles.modalLabel}>Ano:</Text>
              <View style={styles.anoContainer}>
                {[8, 9, 10, 11, 12].map((a) => (
                  <TouchableOpacity
                    key={a}
                    style={[styles.anoBotao, { backgroundColor: novaPergunta.ano === a ? '#4CAF50' : '#ccc' }]}
                    onPress={() => setNovaPergunta({ ...novaPergunta, ano: a })}
                  >
                    <Text style={styles.anoTexto}>{a}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.modalLabel}>Alternativa A:</Text>
              <TextInput
                placeholder="Digite a alternativa A"
                style={[styles.modalInput, erroCampos && !novaPergunta.alternativa_A && styles.inputErro]}
                value={novaPergunta.alternativa_A}
                onChangeText={(t) => setNovaPergunta({ ...novaPergunta, alternativa_A: t })}
              />

              <Text style={styles.modalLabel}>Alternativa B:</Text>
              <TextInput
                placeholder="Digite a alternativa B"
                style={[styles.modalInput, erroCampos && !novaPergunta.alternativa_B && styles.inputErro]}
                value={novaPergunta.alternativa_B}
                onChangeText={(t) => setNovaPergunta({ ...novaPergunta, alternativa_B: t })}
              />

              <Text style={styles.modalLabel}>Alternativa C:</Text>
              <TextInput
                placeholder="Digite a alternativa C"
                style={[styles.modalInput, erroCampos && !novaPergunta.alternativa_C && styles.inputErro]}
                value={novaPergunta.alternativa_C}
                onChangeText={(t) => setNovaPergunta({ ...novaPergunta, alternativa_C: t })}
              />

              <Text style={styles.modalLabel}>Alternativa Correta:</Text>
              <TextInput
                placeholder="Digite a alternativa correta"
                style={[styles.modalInput, erroCampos && !novaPergunta.alternativa_CORRETA && styles.inputErro]}
                value={novaPergunta.alternativa_CORRETA}
                onChangeText={(t) => setNovaPergunta({ ...novaPergunta, alternativa_CORRETA: t })}
              />

              {erroCampos && (
                <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>Preencha todos os campos.</Text>
              )}

              <TouchableOpacity onPress={handleCriarPergunta} style={styles.modalConfirmar}>
                <Text style={styles.modalBotaoTexto}>Salvar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>


    

      {modalEditar && (
        <Modal visible transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <ScrollView>
                <Text style={styles.modalTitulo}>Editar Pergunta</Text>

                <Text style={styles.modalLabel}>Enunciado:</Text>
                <TextInput
                  placeholder="Digite o enunciado"
                  style={[styles.modalInput, erroEdicao && !modalEditar.texto_enunciado && styles.inputErro]}
                  value={modalEditar.texto_enunciado}
                  onChangeText={(t) => setModalEditar({ ...modalEditar, texto_enunciado: t })}
                />

                <Text style={styles.modalLabel}>Dica:</Text>
                <TextInput
                  placeholder="Digite a dica"
                  style={[styles.modalInput, erroEdicao && !modalEditar.dica && styles.inputErro]}
                  value={modalEditar.dica}
                  onChangeText={(t) => setModalEditar({ ...modalEditar, dica: t })}
                />

                <Text style={styles.modalLabel}>Ano:</Text>
                <View style={styles.anoContainer}>
                  {[8, 9, 10, 11, 12].map((a) => (
                    <TouchableOpacity
                      key={a}
                      style={[styles.anoBotao, { backgroundColor: modalEditar.ano === a ? '#4CAF50' : '#ccc' }]}
                      onPress={() => setModalEditar({ ...modalEditar, ano: a })}
                    >
                      <Text style={styles.anoTexto}>{a}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.modalLabel}>Alternativa A:</Text>
                <TextInput
                  placeholder="Digite a alternativa A"
                  style={[styles.modalInput, erroEdicao && !modalEditar.alternativa_A && styles.inputErro]}
                  value={modalEditar.alternativa_A}
                  onChangeText={(t) => setModalEditar({ ...modalEditar, alternativa_A: t })}
                />

                <Text style={styles.modalLabel}>Alternativa B:</Text>
                <TextInput
                  placeholder="Digite a alternativa B"
                  style={[styles.modalInput, erroEdicao && !modalEditar.alternativa_B && styles.inputErro]}
                  value={modalEditar.alternativa_B}
                  onChangeText={(t) => setModalEditar({ ...modalEditar, alternativa_B: t })}
                />

                <Text style={styles.modalLabel}>Alternativa C:</Text>
                <TextInput
                  placeholder="Digite a alternativa C"
                  style={[styles.modalInput, erroEdicao && !modalEditar.alternativa_C && styles.inputErro]}
                  value={modalEditar.alternativa_C}
                  onChangeText={(t) => setModalEditar({ ...modalEditar, alternativa_C: t })}
                />

                <Text style={styles.modalLabel}>Alternativa Correta:</Text>
                <TextInput
                  placeholder="Digite a alternativa correta"
                  style={[styles.modalInput, erroEdicao && !modalEditar.alternativa_CORRETA && styles.inputErro]}
                  value={modalEditar.alternativa_CORRETA}
                  onChangeText={(t) => setModalEditar({ ...modalEditar, alternativa_CORRETA: t })}
                />

                {erroEdicao && (
                  <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>Preencha todos os campos.</Text>
                )}

                <View style={styles.modalBotoes}>
                  <TouchableOpacity onPress={() => setModalEditar(null)} style={styles.modalCancelar}>
                    <Text style={styles.modalBotaoTexto}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSalvarEdicao} style={styles.modalConfirmar}>
                    <Text style={styles.modalBotaoTexto}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}


      
<Modal visible={modalConfirmarExclusao} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={[styles.modalContainerE, { backgroundColor: tema.cards }]}>
      <Text style={[styles.modalTitulo, { color: tema.texto }]}>Confirmar Exclusão</Text>
      <Text style={[styles.info, { color: tema.texto }]}>Tem certeza que deseja excluir esta pergunta?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <TouchableOpacity onPress={() => setModalConfirmarExclusao(false)} style={[styles.card, { backgroundColor: '#AAA' }]}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={excluirPergunta} style={[styles.card, { backgroundColor: '#F44' }]}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Excluir</Text>
        </TouchableOpacity>
      </View>
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
  filtros: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 60, marginVertical: 20 },
  input: { flex: 1, borderBottomWidth: 1, fontSize: 20, paddingVertical: 4 },
  lista: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { padding: 10, borderRadius: 12, marginBottom: 12 },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalBox: { backgroundColor: '#FFF', padding: 30, borderRadius: 10, width: '100%', maxWidth: 700, alignSelf: 'center', maxHeight: '90%' },
  modalTitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalInput: { borderBottomWidth: 1, marginBottom: 12, fontSize: 16 },
  anoContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 10, gap: 10 },
  anoBotao: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, minWidth: 50, alignItems: 'center' },
  anoTexto: { color: '#000', fontWeight: 'bold' },
  modalLabel: { fontWeight: 'bold', marginTop: 10 },
  modalValor: { marginBottom: 10 },
  modalCancelar: { backgroundColor: '#888', padding: 10, borderRadius: 8, alignItems: 'center' },
  modalConfirmar: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8, alignItems: 'center', flex: 1 },
  modalBotoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 10 },
  modalBotaoTexto: { color: '#FFF', fontWeight: 'bold' },
  modalFechar: { position: 'absolute', right: 12, top: 10, zIndex: 10 },
  inputErro: { borderColor: 'red', borderBottomWidth: 2 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },

    modalContainerE: {
    width: '85%',
    borderRadius: 16,
    padding: 20,
    gap: 10,
    maxWidth: 400,
  },
});
