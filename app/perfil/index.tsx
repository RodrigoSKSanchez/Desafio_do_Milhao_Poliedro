import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function PerfilScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [dinheiro, setDinheiro] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [historico, setHistorico] = useState([]);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const carregarPerfil = async () => {
      const idAluno = await AsyncStorage.getItem('idAluno');
      const nome = await AsyncStorage.getItem('usuario_aluno');
      if (nome) setEmail(nome);
      if (!idAluno) return;

      const resPerfil = await fetch(`http://localhost:8000/perfil_aluno?idAluno=${idAluno}`);
      const dados = await resPerfil.json();
      setDinheiro(dados.dinheiro);
      setAcertos(dados.acertos);
      setTotal(dados.total);

      const resHistorico = await fetch(`http://localhost:8000/historico_aluno?idAluno=${idAluno}`);
      const historicoJson = await resHistorico.json();
      setHistorico(historicoJson);
    };
    carregarPerfil();
  }, []);

  const tema = {
    fundo: isDark ? '#000' : '#FAFAFA',
    texto: isDark ? '#fff' : '#000',
    cards: isDark ? '#333' : '#4C5C99',
    voltar: '#C62828',
    modal: isDark ? '#222' : '#fff',
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <View style={styles.topBar}>
        <Text style={[styles.title, { color: tema.texto }]}>
          Olá <Text style={styles.nomeAluno}>{email}</Text>
        </Text>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? '#333' : '#FDD3E4' }]}>
          <Ionicons name="person-outline" size={24} color={tema.texto} />
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: tema.cards }]}>
        <Text style={styles.cardText}>Perguntas acertadas: {acertos}/{total}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: tema.cards }]}>
        
        <Text style={styles.cardText}>
            Dinheiro acumulado: R${dinheiro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>

      </View>

      <TouchableOpacity
        style={[styles.historyButton, { backgroundColor: '#BDBDBD' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.historyText}>HISTÓRICO</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.voltarButton, { backgroundColor: tema.voltar }]}
        onPress={() => router.replace('/jogo_menu')}
      >
        <Text style={styles.voltarText}>VOLTAR</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: tema.modal }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: tema.texto }}>
              Últimos 10 jogos:
            </Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {historico.map((item, index) => (
                <Text key={index} style={{ color: tema.texto }}>
                  • {item.numero_acertos}/{item.total_perguntas} - R$ {item.dinheiro_ganho}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={{ color: '#fff' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 30 },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  nomeAluno: { fontSize: 15, fontWeight: 'normal' },
  iconButton: { borderRadius: 20, padding: 10 },
  card: {
    padding: 20, borderRadius: 15, marginBottom: 20,
    maxWidth: 500, width: '100%', alignSelf: 'center',
  },
  cardText: { color: '#fff', fontSize: 16 },
  historyButton: {
    paddingVertical: 15, alignItems: 'center', borderRadius: 10,
    maxWidth: 500, width: '100%', alignSelf: 'center', marginTop: 10,
  },
  historyText: { color: '#fff', fontWeight: 'bold' },
  voltarButton: {
    paddingVertical: 15, alignItems: 'center', borderRadius: 10,
    maxWidth: 500, width: '100%', alignSelf: 'center', marginTop: 40,
  },
  voltarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center',
  },
  modalBox: {
    padding: 20, borderRadius: 10, width: '80%', maxWidth: 400,
  },
  closeButton: {
    marginTop: 20, backgroundColor: '#333', padding: 10, borderRadius: 8, alignItems: 'center'
  }
});
