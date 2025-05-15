import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView, StatusBar, Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>

              <Image
                source={require('../../assets/images/PoliedroLogo.jpg')}
                style={styles.logo}
                resizeMode="contain"
              />

        <Text style={styles.title}>Login</Text>

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
            <Feather
              name={mostrarSenha ? 'eye' : 'eye-off'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
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

});
