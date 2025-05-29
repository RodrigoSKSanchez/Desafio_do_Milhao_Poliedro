import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function JogoScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeAluno, setNomeAluno] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const carregarNome = async () => {
      const nome = await AsyncStorage.getItem('usuario_aluno');
      if (nome) setNomeAluno(nome.split('@')[0]);
    };
    carregarNome();
  }, []);

  const tema = {
    fundo: isDark ? '#000' : '#FAFAFA',
    texto: isDark ? '#fff' : '#000',
    iconeBg: isDark ? '#333' : '#FDD3E4',
    voltar: isDark ? '#555' : '#BDBDBD',
    modalBg: isDark ? '#222' : '#fff',
    modalBtn: isDark ? '#444' : '#eee',
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <View style={styles.topBar}>
        <Text style={[styles.olaText, { color: tema.texto }]}>Olá <Text style={styles.nomeAluno}>{nomeAluno}</Text></Text>

        <TouchableOpacity style={[styles.iconButton, { backgroundColor: tema.iconeBg }]}
        onPress={() => router.push('../perfil')}>
          <Ionicons name="person-outline" size={24} color={tema.texto} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.jogarButton}
        onPress={() => router.push('/jogo')}
        >
          <Text style={styles.buttonText}>Jogar</Text>
          <Ionicons name="play" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.lojaButton}
        onPress={() => router.push('/loja')}
        >
          <Text style={styles.buttonText}>Loja</Text>
          <FontAwesome name="shopping-bag" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.voltarButton, { backgroundColor: tema.voltar }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.voltarText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.configButton}
        onPress={() => router.push('/configuracoes')}
      >
        <Ionicons name="settings-outline" size={24} color={tema.texto} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: tema.modalBg }]}>
            <Text style={[styles.modalText, { color: tema.texto }]}>Deseja voltar à tela inicial?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalBtn, { backgroundColor: tema.modalBtn }]}
              >
                <Text style={{ color: tema.texto }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.replace('/')}
                style={[styles.modalBtn, { backgroundColor: tema.modalBtn }]}
              >
                <Text style={{ color: tema.texto }}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 130,
    paddingHorizontal: 10,
  },
  olaText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  nomeAluno: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  iconButton: {
    borderRadius: 20,
    padding: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
    alignItems: 'center',
  },
  jogarButton: {
    width: '100%',
    backgroundColor: '#26264F',
    borderRadius: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    maxWidth: 500,
  },
  lojaButton: {
    width: '100%',
    backgroundColor: '#4C9A81',
    borderRadius: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    maxWidth: 500,
  },
  voltarButton: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    maxWidth: 500,
    margin: 30,
  },
  voltarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  configButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 350,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
