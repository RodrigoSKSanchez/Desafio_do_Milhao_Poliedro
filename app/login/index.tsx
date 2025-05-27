import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tema = {
    fundo: isDark ? '#000' : '#F7F7F7',
    texto: isDark ? '#fff' : '#000',
    inputBg: isDark ? '#444' : '#dbd9d9',
    modalBg: isDark ? '#222' : '#fff',
    modalTexto: isDark ? '#fff' : '#000',
  };

  const mostrarAlerta = (mensagem: string) => {
    setMensagemErro(mensagem);
    setModalVisible(true);
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      setMensagemErro('Preencha todos os campos.');
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_aluno: email,
          senha_aluno: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const nome = email.split('@')[0];
        await AsyncStorage.setItem('usuario_aluno', nome);
        await AsyncStorage.setItem('idAluno', data.idAluno.toString());
        router.push('/jogo_menu');
      } else {
        mostrarAlerta(data.detail || 'Credenciais inválidas');
      }
    } catch (error) {
      mostrarAlerta('Não foi possível conectar ao servidor');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/PoliedroLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: tema.texto }]}>Login</Text>

        <View style={[styles.inputContainerEmail, { backgroundColor: tema.inputBg }]}>
          <Feather name="user" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: tema.texto }]}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={[styles.inputContainerSenha, { backgroundColor: tema.inputBg }]}>
          <Feather name="lock" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: tema.texto }]}
            placeholder="Senha"
            placeholderTextColor="#888"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Feather
              name={mostrarSenha ? 'eye' : 'eye-off'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Text style={[styles.backText, { color: '#2E2E54' }]}>← Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { backgroundColor: tema.modalBg }]}>
            <Text style={[styles.modalText, { color: tema.modalTexto }]}>{mensagemErro}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    alignItems: 'center',
    color: '#000',
  },
  inputContainerEmail: {
    backgroundColor: '#dbd9d9',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 70,
    marginBottom: 15,
    height: 50,
  },
  inputContainerSenha: {
    backgroundColor: '#dbd9d9',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 70,
    marginBottom: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  backButton: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#2E2E54',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2E2E54',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    maxWidth: 400,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  logo: {
    width: 175,
    height: 175,
    marginBottom: 80,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2E2E54',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
