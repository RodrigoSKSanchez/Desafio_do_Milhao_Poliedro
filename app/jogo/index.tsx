import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,
  useWindowDimensions, Modal
} from 'react-native';

import { useTheme } from '../../context/ThemeContext';


import { useRouter } from 'expo-router';

type Alternativa = {
  texto: string;
  correta: boolean;
  letra?: string;
};

type Pergunta = {
  id: number;
  enunciado: string;
  ano: number;
  dica: string;
  alternativas: Alternativa[];
};

  
export default function JogoScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const { width } = useWindowDimensions();

  const [pergunta, setPergunta] = useState<Pergunta | null>(null);
  const [anoAtual, setAnoAtual] = useState(8);
  const [contadorQuestoes, setContadorQuestoes] = useState(0);
  const [totalPerguntas, setTotalPerguntas] = useState(0);
  const [modalErro, setModalErro] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState<Alternativa | null>(null);
  const [modalPararVisible, setModalPararVisible] = useState(false);
  const [modalPerguntaVisible, setModalPerguntaVisible] = useState(false);
const [modalDicaVisible, setModalDicaVisible] = useState(false);
const [dica, setDica] = useState(0);
const [pula, setPula] = useState(0);
const [elimina, setElimina] = useState(0);
  const [dinheiro, setDinheiro] = useState(0);
  const [modalVitoriaVisible, setModalVitoriaVisible] = useState(false);
  const [alternativasDesativadas, setAlternativasDesativadas] = useState<string[]>([]);
  const finalizarJogo = async () => {
    const idAluno = await AsyncStorage.getItem('idAluno');
    try {
      await fetch('http://localhost:8000/registrar_historico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idAluno,
          numero_acertos: contadorQuestoes,
          dinheiro_ganho: dinheiro
        })
      });
    } catch (error) {
      console.error("Erro ao registrar histórico:", error);
    }
    setModalVitoriaVisible(true);
  };

  const [perguntasUsadas, setPerguntasUsadas] = useState(new Set());
  const isDesktop = width > 768;
  const MAX_DINHEIRO = 1000000;

  const cores = {
    fundo: isDark ? '#000' : '#fff',
    texto: isDark ? '#fff' : '#000',
    box: '#2E2E54',
  };

  const buscarPergunta = async (tentativas = 0) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/pergunta?ano=${anoAtual}`);
    
if (!response.ok) {
  if (anoAtual < 13) {
    const proximoAno = anoAtual + 1;
    console.warn("Acabaram as perguntas deste ano. Subindo para o próximo ano.");
    setAnoAtual(proximoAno);
    
} else {
    console.warn("Acabaram as perguntas do último ano. Encerrando.");
    
  }
  return;
}


    const data = await response.json();

    if (perguntasUsadas.has(data.id)) {
      if (tentativas > 10) {
        console.warn("Muitas tentativas com perguntas repetidas. Encerrando.");
        
        return;
      }
      console.warn("Pergunta já usada. Tentando novamente...");
      buscarPergunta(tentativas + 1);
      return;
    }

    const letras = ['A', 'B', 'C', 'D'];
    const alternativasEmbaralhadas = [...data.alternativas].sort(() => Math.random() - 0.5);
    const alternativasComLetra = letras.map((letra, i) => ({ ...alternativasEmbaralhadas[i], letra }));

    setAlternativasDesativadas([]);
    setPergunta({
      id: data.id,
      enunciado: data.enunciado,
      ano: data.ano,
      dica: data.dica,
      alternativas: alternativasComLetra,
    } as Pergunta);

    setPerguntasUsadas(prev => new Set(prev).add(data.id));
  } catch (error) {
    console.warn("Erro ao buscar pergunta. Exibindo modal.");
    
  }
};

  
  const eliminarAlternativas = () => {
    if (!pergunta) return;

    const alternativasErradas = pergunta.alternativas.filter((a) => !a.correta);
    const remover = alternativasErradas
      .slice(0, 2)
      .map((a) => a.letra)
      .filter((letra): letra is string => letra !== undefined);

    setAlternativasDesativadas(remover);

    setPergunta(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        alternativas: prev.alternativas.map(a => ({
          ...a,
          texto: remover.includes(a.letra ?? '') ? '---' : a.texto
        }))
      };
    });
  };




  const usarPowerup = async (tipo: string, callback: () => void) => {
    const idAluno = await AsyncStorage.getItem('idAluno');
    const res = await fetch('http://localhost:8000/usar_powerup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idAluno: Number(idAluno), tipo })
    });
    if (res.ok) {
      if (tipo === 'dica') setDica(prev => prev - 1);
      if (tipo === 'pula') setPula(prev => prev - 1);
      if (tipo === 'elimina') setElimina(prev => prev - 1);
      callback();
    } else {
      const erro = await res.json();
      console.warn('Erro:', erro.detail);
    }
  };


const encerrarJogo = () => {
    router.replace({
      pathname: '/fim_de_jogo',
      params: {
        total: totalPerguntas.toString(),
        dinheiro: dinheiro.toString(),
        respondidas: contadorQuestoes.toString(),
      },
    });
  };

  useEffect(() => {
    const carregarPowerups = async () => {
      const idAluno = await AsyncStorage.getItem('idAluno');
      const res = await fetch(`http://localhost:8000/perfil_aluno?idAluno=${idAluno}`);
      const dados = await res.json();
      setDica(dados.dica || 0);
      setPula(dados.pula || 0);
      setElimina(dados.elimina || 0);
    };
    carregarPowerups();
    buscarPergunta();
  }, [anoAtual]);

  
const verificarResposta = (alternativa: { correta: any; }) => {
  setTotalPerguntas(prev => prev + 1);

  if (alternativa.correta) {
    const novaContagem = contadorQuestoes + 1;
    const novoDinheiro = dinheiro + 20000;

    setContadorQuestoes(novaContagem);
    setDinheiro(novoDinheiro);

    if (novoDinheiro >= MAX_DINHEIRO && !modalVitoriaVisible) {
      setModalVitoriaVisible(true);
    }

    if (novaContagem % 10 === 0 && anoAtual < 13) {
      setAnoAtual((prev) => prev + 1);
    } else {
      buscarPergunta();
    }
  } else {
    if (!pergunta) return;

    const novaQuantia = Math.max(dinheiro - 100000, 0);
    setDinheiro(novaQuantia);

    const correta = pergunta.alternativas.find((a) => a.correta);
    setRespostaCorreta(correta ?? null);
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
      pathname: '/fim_de_jogo',
      params: {
        total: totalPerguntas.toString(),
        dinheiro: valorFinal.toString(),
        respondidas: contadorQuestoes.toString(),
      },
    });
  };

  if (!pergunta) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000',}}>
      <Text style={{ color: '#fff', fontSize: 18 }}>Carregando pergunta...</Text>
    <Modal
        visible={modalVitoriaVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={{
          flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'white', padding: 20, borderRadius: 20,
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
              PARABÉNS POR GANHAR O JOGO!!
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: '#444', padding: 10, borderRadius: 10 }}
              onPress={() => {
                setModalVitoriaVisible(false);
                router.replace({
      pathname: '/fim_de_jogo',
      params: {
        total: totalPerguntas.toString(),
        dinheiro: dinheiro.toString(),
        respondidas: contadorQuestoes.toString(),}
    });
              }}
            >
              <Text style={{ color: 'white' }}>Ir para tela final</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      </Modal>

  <Modal visible={modalDicaVisible} transparent animationType="fade">
    <View style={styles.modalFundo}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTexto}>
          💡:{"\n"}{(pergunta as unknown as Pergunta)?.dica}
        </Text>
        <TouchableOpacity onPress={() => setModalDicaVisible(false)}>
          <Text style={styles.botaoPararTexto}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>


    </SafeAreaView>
  );
}

return (
  <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.fundo} />
      <View style={[styles.content, isDesktop && styles.contentDesktop]}>
        <TouchableOpacity
          style={[styles.perguntaBox, { backgroundColor: cores.box }]}
          onPress={() => setModalPerguntaVisible(true)}
        >
          <Text style={styles.perguntaTexto}>{(pergunta?.enunciado || '') || "(Carregando...)"}</Text>
          {(pergunta?.alternativas || []).map((alt: Alternativa, index) => (
            <Text key={index} style={styles.perguntaAlternativaTexto}>
              {alt.letra}) {alt.texto}
            </Text>
          ))}
        </TouchableOpacity>

        <View style={styles.respostasGrid}>
          <View style={styles.linhaResposta}>
            {(pergunta?.alternativas || []).slice(0, 2).map((alt: Alternativa, index: React.Key) => (
              
<TouchableOpacity
  key={index}
  disabled={alternativasDesativadas.includes(alt.letra ?? '')}
  style={[
    styles.respostaBotao,
    {
      backgroundColor: alternativasDesativadas.includes(alt.letra ?? '')
        ? '#888'
        : alt.letra === 'A'
        ? 'red'
        : alt.letra === 'B'
        ? 'green'
        : alt.letra === 'C'
        ? 'magenta'
        : alt.letra === 'D'
        ? 'blue'
        : '#888',
      opacity: alternativasDesativadas.includes(alt.letra ?? '') ? 0.6 : 1,
    },
  ]}
  onPress={() => verificarResposta(alt)}
>
  <Text style={styles.respostaTexto}>{alt.letra}</Text>
</TouchableOpacity>

            ))}
          </View>
          <View style={styles.linhaResposta}>
            {(pergunta?.alternativas || []).slice(2).map((alt: Alternativa, index: React.Key) => (
              
<TouchableOpacity
  key={index}
  disabled={alternativasDesativadas.includes(alt.letra ?? '')}
  style={[
    styles.respostaBotao,
    {
      backgroundColor: alternativasDesativadas.includes(alt.letra ?? '')
        ? '#888'
        : alt.letra === 'A'
        ? 'red'
        : alt.letra === 'B'
        ? 'green'
        : alt.letra === 'C'
        ? 'magenta'
        : alt.letra === 'D'
        ? 'blue'
        : '#888',
      opacity: alternativasDesativadas.includes(alt.letra ?? '') ? 0.6 : 1,
    },
  ]}
  onPress={() => verificarResposta(alt)}
>
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

        
        <View style={[styles.ajudaContainer]}>
          <TouchableOpacity
            onPress={() => dica > 0 && usarPowerup('dica', () => setModalDicaVisible(true))}
            style={[styles.ajudaBotao, { backgroundColor: dica > 0 ? '#4CAF50' : '#999' }]}
          >
            <Text style={styles.ajudaTexto}>DICA</Text>
            {dica > 0 && <View style={{
              position: 'absolute', top: -5, right: -5,
              backgroundColor: 'red', borderRadius: 10, width: 20, height: 20,
              justifyContent: 'center', alignItems: 'center'
            }}><Text style={{ color: '#fff', fontSize: 12 }}>{dica}</Text></View>}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pula > 0 && usarPowerup('pula', () => buscarPergunta())}
            style={[styles.ajudaBotao, { backgroundColor: pula > 0 ? '#4CAF50' : '#999' }]}
          >
            <Text style={styles.ajudaTexto}>⏭</Text>
            {pula > 0 && <View style={{
              position: 'absolute', top: -5, right: -5,
              backgroundColor: 'red', borderRadius: 10, width: 20, height: 20,
              justifyContent: 'center', alignItems: 'center'
            }}><Text style={{ color: '#fff', fontSize: 12 }}>{pula}</Text></View>}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => elimina > 0 && usarPowerup('elimina', () => eliminarAlternativas())}
            style={[styles.ajudaBotao, { backgroundColor: elimina > 0 ? '#4CAF50' : '#999' }]}
          >
            <Text style={styles.ajudaTexto}>1/2</Text>
            {elimina > 0 && <View style={{
              position: 'absolute', top: -5, right: -5,
              backgroundColor: 'red', borderRadius: 10, width: 20, height: 20,
              justifyContent: 'center', alignItems: 'center'
            }}><Text style={{ color: '#fff', fontSize: 12 }}>{elimina}</Text></View>}
          </TouchableOpacity>
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
            <Text style={styles.modalTexto}>{(pergunta?.enunciado || '')}</Text>
            {(pergunta?.alternativas || []).map((alt: Alternativa, index) => (
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
    
      

    <Modal
        visible={modalVitoriaVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={{
          flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'white', padding: 20, borderRadius: 20,
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
              PARABÉNS POR GANHAR O JOGO!!
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: '#444', padding: 10, borderRadius: 10 }}
              onPress={() => {
                setModalVitoriaVisible(false);
                router.replace({
      pathname: '/fim_de_jogo',
      params: {
        total: totalPerguntas.toString(),
        dinheiro: dinheiro.toString(),
        respondidas: contadorQuestoes.toString(),}
    });
              }}
            >
              <Text style={{ color: 'white' }}>Ir para tela final</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      </Modal>

<Modal visible={modalDicaVisible} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTexto}>💡:{"\n"}{pergunta?.dica}</Text>
            <TouchableOpacity onPress={() => setModalDicaVisible(false)}>
              <Text style={styles.botaoPararTexto}>Fechar</Text>
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
  perguntaBox: { width: '90%', borderRadius: 10, padding: 16, maxWidth: 800, marginBottom:10 },
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
  respostasGrid: { gap: 10 },
  linhaResposta: { flexDirection: 'row', justifyContent: 'center', gap: 30 },
  respostaBotao: { width: 140, height: 120, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  respostaTexto: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  ajudaContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 10 },
  ajudaBotao: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2E2E54', justifyContent: 'center', alignItems: 'center' },
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

