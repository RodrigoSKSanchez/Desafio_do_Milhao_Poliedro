import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JogoScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeAluno, setNomeAluno] = useState('');

  useEffect(() => {
    const carregarNome = async () => {
      const nome = await AsyncStorage.getItem('usuario_aluno');
      if (nome) setNomeAluno(nome);
    };
    carregarNome();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.olaText}>
          Olá <Text style={styles.nomeAluno}>{nomeAluno}</Text>
        </Text>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.jogarButton}>
          <Text style={styles.buttonText}>Jogar</Text>
          <Ionicons name="play" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.lojaButton}>
          <Text style={styles.buttonText}>Loja</Text>
          <FontAwesome name="shopping-bag" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.voltarButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.voltarText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.configButton}
        onPress={() => router.push('/configuracoes')}
      >
        <Ionicons name="settings-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Deseja voltar à tela inicial?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalBtn}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.replace('/')}
                style={styles.modalBtn}
              >
                <Text>Sim</Text>
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
    backgroundColor: '#FAFAFA',
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
    backgroundColor: '#FDD3E4',
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
    backgroundColor: '#BDBDBD',
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
    backgroundColor: '#fff',
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
    backgroundColor: '#eee',
    borderRadius: 10,
  },
});