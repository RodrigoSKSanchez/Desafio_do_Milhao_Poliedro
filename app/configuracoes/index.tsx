import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';

export default function ConfiguracoesScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const modoEscuro = theme === 'dark';

  const [volume, setVolume] = useState(100);
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [modalMensagemVisible, setModalMensagemVisible] = useState(false);

  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const mostrarAlerta = (mensagem: string) => {
    setMensagemErro(mensagem);
    setModalMensagemVisible(true);
  };

  useEffect(() => {
    AsyncStorage.getItem('usuario_aluno').then(value => {
      if (value) setEmail(value);
    });
  }, []);

  const handleCancelar = () => {
    setModalVisible(false);
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
  };

  const handleTrocarSenha = async () => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      mostrarAlerta('Preencha todos os campos');
    } else if (novaSenha !== confirmarSenha) {
      mostrarAlerta('As senhas não coincidem');
    } else if (senhaAtual === novaSenha) {
      mostrarAlerta('As senhas não podem ser iguais');
    } else {
      try {
        const response = await fetch("http://127.0.0.1:8000/trocar_senha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario_aluno: email,
            senha_atual: senhaAtual,
            nova_senha: novaSenha,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          mostrarAlerta(data.mensagem);
          handleCancelar();
        } else {
          mostrarAlerta(data.detail || 'Erro ao trocar senha');
        }
      } catch (error) {
        mostrarAlerta('Erro ao conectar com o servidor');
      }
    }
  };

  const tema = {
    fundo: modoEscuro ? '#000' : '#fff',
    texto: modoEscuro ? '#fff' : '#000',
    botaoFundo: modoEscuro ? '#fff' : '#000',
    botaoTexto: modoEscuro ? '#000' : '#fff',
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <View style={styles.topBar}>
        <Text style={[styles.titulo, { color: tema.texto }]}>Configurações</Text>
      </View>

      <View style={styles.sliderContainer}>
        <Ionicons name="headset-outline" size={24} color={tema.texto} />
        {Platform.OS === 'web' ? (
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ flex: 1, marginLeft: 10 }}
          />
        ) : (
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={setVolume}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#1E90FF"
          />
        )}
        <Text style={[styles.sliderText, { color: tema.texto }]}>{volume} %</Text>
      </View>

      <TouchableOpacity onPress={toggleTheme} style={styles.temaContainer}>
        <Ionicons
          name={modoEscuro ? 'moon-outline' : 'sunny-outline'}
          size={24}
          color={tema.texto}
        />
        <Text style={[styles.temaTexto, { color: tema.texto }]}>
          {modoEscuro ? 'Modo Escuro' : 'Modo Claro'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: tema.botaoFundo }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.textoBotao, { color: tema.botaoTexto }]}>Mudar Senha</Text>
      </TouchableOpacity>

      {/* Modal troca de senha */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Trocar Senha</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Senha Atual"
                secureTextEntry={!mostrarSenhaAtual}
                style={styles.input}
                value={senhaAtual}
                onChangeText={setSenhaAtual}
              />
              <TouchableOpacity onPress={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}>
                <Ionicons name={mostrarSenhaAtual ? 'eye' : 'eye-off'} size={20} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Nova Senha"
                secureTextEntry={!mostrarNovaSenha}
                style={styles.input}
                value={novaSenha}
                onChangeText={setNovaSenha}
              />
              <TouchableOpacity onPress={() => setMostrarNovaSenha(!mostrarNovaSenha)}>
                <Ionicons name={mostrarNovaSenha ? 'eye' : 'eye-off'} size={20} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Confirmar Nova Senha"
                secureTextEntry={!mostrarConfirmarSenha}
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                <Ionicons name={mostrarConfirmarSenha ? 'eye' : 'eye-off'} size={20} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
              <TouchableOpacity
                style={[styles.modalButton, { flex: 1, backgroundColor: '#ccc' }]}
                onPress={handleCancelar}
              >
                <Text style={[styles.modalButtonText, { color: '#000' }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { flex: 1 }]}
                onPress={handleTrocarSenha}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de mensagens */}
      <Modal visible={modalMensagemVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { backgroundColor: tema.fundo }]}>
            <Text style={[styles.modalText, { color: tema.texto }]}>{mensagemErro}</Text>
            <TouchableOpacity
              onPress={() => setModalMensagemVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.voltarButton}
        onPress={() => router.replace('/jogo_menu')}
      >
        <Text style={styles.voltarText}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 100 },
  titulo: { fontSize: 22, fontWeight: 'bold', alignSelf: 'center' },
  sliderContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30, alignSelf: 'center' },
  slider: { flex: 1 },
  sliderText: { width: 50, textAlign: 'right' },
  temaContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40, maxWidth: 150, alignSelf: 'center' },
  temaTexto: { textDecorationLine: 'underline', fontSize: 16, marginLeft: 10 },
  botao: { paddingVertical: 14, paddingHorizontal: 30, borderRadius: 20, alignItems: 'center', alignSelf: 'center', marginBottom: 30 },
  textoBotao: { fontWeight: 'bold', fontSize: 16 },
  voltarButton: { backgroundColor: '#BDBDBD', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 20, alignSelf: 'center' },
  voltarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalBox: { width: '85%', backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 5, maxWidth: 500 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { flex: 1, padding: 10 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
  modalButton: { backgroundColor: '#2E2E54', borderRadius: 5, padding: 10, alignItems: 'center', marginTop: 10 },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
});
