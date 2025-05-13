import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Feather name={mostrarSenha ? 'eye' : 'eye-off'} size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!mostrarConfirmar}
          />
          <TouchableOpacity onPress={() => setMostrarConfirmar(!mostrarConfirmar)}>
            <Feather name={mostrarConfirmar ? 'eye' : 'eye-off'} size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  inputContainer: {
    backgroundColor: '#dbd9d9',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 65,
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
    marginTop: 10,
    maxWidth: 400,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
