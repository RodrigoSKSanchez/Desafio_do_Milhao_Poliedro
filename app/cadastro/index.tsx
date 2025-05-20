
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
  Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_aluno: email,
          senha_aluno: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        mostrarConfirmacao(data.mensagem || 'Cadastro realizado com sucesso!');
      } else {
        mostrarErro(data.detail || 'Erro ao cadastrar');
      }
    } catch (error) {
      mostrarErro('Não foi possível conectar ao servidor');
    }
  };

  const fecharSucesso = () => {
    setModalSucesso(false);
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/PoliedroLogo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputContainerEmail}>
          <Feather name="user" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainerSenha}>
          <Feather name="lock" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="    Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Feather name={mostrarSenha ? 'eye' : 'eye-off'} size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainerSenha}>
          <Feather name="lock" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="    Confirme sua senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!mostrarConfirmar}
          />
          <TouchableOpacity onPress={() => setMostrarConfirmar(!mostrarConfirmar)}>
            <Feather name={mostrarConfirmar ? 'eye' : 'eye-off'} size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Erro */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{mensagemModal}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso */}
      <Modal visible={modalSucesso} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{mensagemModal}</Text>
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
