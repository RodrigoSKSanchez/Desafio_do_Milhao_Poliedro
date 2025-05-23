import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,
  useWindowDimensions, Modal
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function JogoScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const { width } = useWindowDimensions();

  const [pergunta, setPergunta] = useState(null);
  const [anoAtual, setAnoAtual] = useState(8);
  const [contadorQuestoes, setContadorQuestoes] = useState(0);
  const [modalErro, setModalErro] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [modalPararVisible, setModalPararVisible] = useState(false);
  const [modalPerguntaVisible, setModalPerguntaVisible] = useState(false);
  const [dinheiro, setDinheiro] = useState(0);

  const isDesktop = width > 768;
  const MAX_DINHEIRO = 1000000;

  const cores = {
    fundo: isDark ? '#000' : '#fff',
    texto: isDark ? '#fff' : '#000',
    box: '#2E2E54',
  };

  const buscarPergunta = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/pergunta?ano=${anoAtual}`);
      if (!response.ok) {
        encerrarJogo();
        return;
      }
      const data = await response.json();
      const letras = ['A', 'B', 'C', 'D'];
      const alternativasEmbaralhadas = [...data.alternativas].sort(() => Math.random() - 0.5);
      const alternativasComLetra = letras.map((letra, i) => ({ ...alternativasEmbaralhadas[i], letra }));
      setPergunta({
        id: data.id,
        enunciado: data.enunciado,
        ano: data.ano,
        dica: data.dica,
        alternativas: alternativasComLetra,
      });
    } catch (error) {
      encerrarJogo();
    }
  };

  const encerrarJogo = () => {
    router.replace({
      pathname: '/fim_de_jogo/index',
      params: {
        dinheiro: dinheiro.toString(),
        respondidas: contadorQuestoes.toString(),
      },
    });
  };

  useEffect(() => {
    buscarPergunta();
  }, [anoAtual]);

  const verificarResposta = (alternativa) => {
    if (alternativa.correta) {
      const novaContagem = contadorQuestoes + 1;
      const novoDinheiro = dinheiro + 20000;
      setContadorQuestoes(novaContagem);
      setDinheiro(novoDinheiro);
      if (novoDinheiro >= MAX_DINHEIRO) {
        encerrarJogo();
        return;
      }
      if (novaContagem % 10 === 0 && anoAtual < 13) {
        setAnoAtual((prev) => prev + 1);
      }
      buscarPergunta();
    } else {
      const novaQuantia = Math.max(dinheiro - 100000, 0);
      setDinheiro(novaQuantia);
      const correta = pergunta.alternativas.find((a) => a.correta);
      setRespostaCorreta(correta);
      setModalErro(true);
    }
  };

  const fecharModalErro = () => {
    setModalErro(false);
    buscarPergunta();
  };

  const confirmarParar = () => {
    const valorFinal = Math.floor(dinheiro * 0.5);
    router.replace({
      pathname: '/fim_de_jogo/index',
      params: {
        dinheiro: valorFinal.toString(),
        respondidas: contadorQuestoes.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.fundo} />
      <View style={[styles.content, isDesktop && styles.contentDesktop]}>
        <TouchableOpacity
          style={[styles.perguntaBox, { backgroundColor: cores.box }]}
          onPress={() => setModalPerguntaVisible(true)}
        >
          <Text style={styles.perguntaTexto}>{pergunta?.enunciado || "(Carregando...)"}</Text>
          {pergunta?.alternativas.map((alt, index) => (
            <Text key={index} style={styles.perguntaAlternativaTexto}>
              {alt.letra}) {alt.texto}
            </Text>
          ))}
        </TouchableOpacity>

        <View style={styles.respostasGrid}>
          <View style={styles.linhaResposta}>
            {pergunta?.alternativas.slice(0, 2).map((alt, index) => (
              <TouchableOpacity key={index} style={[styles.respostaBotao, { backgroundColor: '#888' }]} onPress={() => verificarResposta(alt)}>
                <Text style={styles.respostaTexto}>{alt.letra}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.linhaResposta}>
            {pergunta?.alternativas.slice(2).map((alt, index) => (
              <TouchableOpacity key={index} style={[styles.respostaBotao, { backgroundColor: '#888' }]} onPress={() => verificarResposta(alt)}>
                <Text style={styles.respostaTexto}>{alt.letra}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.valorAtualContainer}>
          <View style={[styles.valorBox, { backgroundColor: cores.box }]}>
            <Text style={styles.valorAtualTexto}>Acumulado: R$ {dinheiro.toLocaleString('pt-BR')}</Text>
          </View>
        </View>

        <View style={styles.premiosContainer}>
          <View style={[styles.premioBox, { backgroundColor: cores.box }]}>
            <Text style={styles.premioTexto}>Errar{"\n"}-100.000{"\n"}R$ {Math.max(dinheiro - 100000, 0).toLocaleString('pt-BR')}</Text>
          </View>
          <View style={[styles.premioBox, { backgroundColor: cores.box }]}>
            <Text style={styles.premioTexto}>Parar{"\n"}+50%{"\n"}R$ {(dinheiro * 0.5).toLocaleString('pt-BR')}</Text>
          </View>
          <View style={[styles.premioBox, { backgroundColor: cores.box }]}>
            <Text style={styles.premioTexto}>Acertar{"\n"}+20.000{"\n"}R$ {(dinheiro + 20000).toLocaleString('pt-BR')}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botaoParar} onPress={() => setModalPararVisible(true)}>
          <Text style={styles.botaoPararTexto}>PARAR</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalPerguntaVisible} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.fecharModal} onPress={() => setModalPerguntaVisible(false)}>
              <Text style={styles.fecharModalTexto}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTexto}>{pergunta?.enunciado}</Text>
            {pergunta?.alternativas.map((alt, index) => (
              <Text key={index} style={{ color: 'white', fontSize: 16, marginVertical: 2 }}>
                {alt.letra}) {alt.texto}
              </Text>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={modalErro} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTexto}>Resposta errada!{"\n"}A resposta certa era:{"\n"}({respostaCorreta?.letra}) {respostaCorreta?.texto}</Text>
            <TouchableOpacity onPress={fecharModalErro}>
              <Text style={styles.botaoPararTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalPararVisible} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.fecharModal} onPress={() => setModalPararVisible(false)}>
              <Text style={styles.fecharModalTexto}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTexto}>VOCÊ TEM CERTEZA QUE QUER PARAR?{"\n"}Recompensa: R$ {(dinheiro * 0.5).toFixed(0)}</Text>
            <TouchableOpacity style={styles.botaoParar} onPress={confirmarParar}>
              <Text style={styles.botaoPararTexto}>PARAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, justifyContent: 'space-around', alignItems: 'center' },
  contentDesktop: { paddingHorizontal: 40 },
  perguntaBox: { width: '90%', borderRadius: 10, padding: 16, maxWidth: 800 },
  perguntaTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  perguntaAlternativaTexto: { color: '#fff', fontSize: 12, marginTop: 4 },
  valorAtualContainer: { marginTop: 10 },
  valorBox: {
    backgroundColor: '#2E2E54',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 10,
  },
  valorAtualTexto: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  respostasGrid: { gap: 20 },
  linhaResposta: { flexDirection: 'row', justifyContent: 'center', gap: 30 },
  respostaBotao: { width: 140, height: 120, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  respostaTexto: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  ajudaContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 10 },
  ajudaBotao: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#2E2E54', justifyContent: 'center', alignItems: 'center' },
  ajudaTexto: { color: '#fff', fontWeight: 'bold' },
  premiosContainer: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10, gap: 20 },
  premioBox: { padding: 10, borderRadius: 10, minWidth: 100, alignItems: 'center' },
  premioTexto: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  botaoParar: { borderColor: 'red', borderWidth: 3, paddingVertical: 10, paddingHorizontal: 40, borderRadius: 100, marginTop: 20 },
  botaoPararTexto: { color: 'red', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' },
  modalFundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContainer: { backgroundColor: '#2E2E54', borderRadius: 20, padding: 30, width: '100%', maxWidth: 600, alignItems: 'center', position: 'relative' },
  modalTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  fecharModal: { position: 'absolute', top: 10, right: 10 },
  fecharModalTexto: { color: 'red', fontSize: 22, fontWeight: 'bold' },
});
