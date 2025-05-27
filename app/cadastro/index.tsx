import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function CadastroScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tema = {
    fundo: isDark ? '#000' : '#F7F7F7',
    texto: isDark ? '#fff' : '#000',
    inputBg: isDark ? '#444' : '#dbd9d9',
    modalBg: isDark ? '#222' : '#fff',
    modalTexto: isDark ? '#fff' : '#000'
  };

  const mostrarErro = (mensagem: string) => {
    setMensagemModal(mensagem);
    setModalVisible(true);
  };

  const mostrarConfirmacao = (mensagem: string) => {
    setMensagemModal(mensagem);
    setModalSucesso(true);
  };

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      mostrarErro('As senhas não são iguais!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_aluno: email, senha_aluno: senha }),
      });

      const data = await response.json();
      if (response.ok) {
        mostrarConfirmacao(data.mensagem || 'Cadastro realizado com sucesso!');
      } else {
        mostrarErro(data.detail || 'Erro ao cadastrar');
      }
    } catch {
      mostrarErro('Não foi possível conectar ao servidor');
    }
  };

  const fecharSucesso = () => {
    setModalSucesso(false);
    router.push('/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />
      <View style={styles.content}>
        <Image source={require('../../assets/images/PoliedroLogo.png')} style={styles.logo} resizeMode="contain" />

        <Text style={[styles.title, { color: tema.texto }]}>Cadastro</Text>

        <View style={[styles.inputContainerEmail, { backgroundColor: tema.inputBg }]}>
          <Feather name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: tema.texto }]} placeholder="Email" placeholderTextColor="#888"
            value={email} onChangeText={setEmail} keyboardType="email-address"
          />
        </View>

        <View style={[styles.inputContainerSenha, { backgroundColor: tema.inputBg }]}>
          <Feather name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: tema.texto }]} placeholder="    Senha" placeholderTextColor="#888"
            value={senha} onChangeText={setSenha} secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Feather name={mostrarSenha ? 'eye' : 'eye-off'} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainerSenha, { backgroundColor: tema.inputBg }]}>
          <Feather name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: tema.texto }]} placeholder="    Confirme sua senha" placeholderTextColor="#888"
            value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={!mostrarConfirmar}
          />
          <TouchableOpacity onPress={() => setMostrarConfirmar(!mostrarConfirmar)}>
            <Feather name={mostrarConfirmar ? 'eye' : 'eye-off'} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { backgroundColor: tema.modalBg }]}>
            <Text style={[styles.modalText, { color: tema.modalTexto }]}>{mensagemModal}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalSucesso} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { backgroundColor: tema.modalBg }]}>
            <Text style={[styles.modalText, { color: tema.modalTexto }]}>{mensagemModal}</Text>
            <TouchableOpacity onPress={fecharSucesso} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 30, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 40, color: '#000' },
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
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: 'black' },
  backButton: { marginBottom: 16, alignItems: 'center', justifyContent: 'center' },
  backText: { color: '#2E2E54', fontSize: 16 },
  button: {
    backgroundColor: '#2E2E54',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    maxWidth: 400,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '500' },
  logo: { width: 175, height: 175, marginBottom: 80 },
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
