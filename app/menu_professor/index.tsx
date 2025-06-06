
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function MenuProfessor(): React.JSX.Element {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [modalVisible, setModalVisible] = useState(false);

  const tema = {
    fundo: isDark ? '#000' : '#FAFAFA',
    texto: isDark ? '#fff' : '#000',
    voltar: isDark ? '#555' : '#BDBDBD',
    iconeBg: isDark ? '#333' : '#FDD3E4',
    perguntas: '#468b98',
    alunos: '#fde276',
    modalBg: isDark ? '#222' : '#fff',
    modalBtn: isDark ? '#444' : '#eee',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.perguntasButton, { backgroundColor: tema.perguntas }]}>
          <Text style={styles.buttonText}>Perguntas</Text>
          <Feather name="help-circle" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.alunosButton, { backgroundColor: tema.alunos }]}>
          <Text style={styles.buttonText}>Alunos</Text>
          <Feather name="users" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.voltarButton, { backgroundColor: tema.voltar }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.voltarText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.configButton} onPress={() => router.push('/config_prof')}>
        <Ionicons name="settings-outline" size={24} color={tema.texto} />
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: tema.modalBg }]}>
            <Text style={[styles.modalText, { color: tema.texto }]}>Deseja voltar à tela inicial?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalBtn, { backgroundColor: tema.modalBtn }]}>
                <Text style={{ color: tema.texto }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.replace('/')} style={[styles.modalBtn, { backgroundColor: tema.modalBtn }]}>
                <Text style={{ color: tema.texto }}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  perguntasButton: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    maxWidth: 500,
  },
  alunosButton: {
    width: '100%',
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
    marginTop: 30,
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
