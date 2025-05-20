import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function ConfiguracoesScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const [volume, setVolume] = useState(100);
  const [modoEscuro, setModoEscuro] = useState(scheme === 'dark');

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

      <TouchableOpacity
        onPress={() => setModoEscuro(!modoEscuro)}
        style={styles.temaContainer}
      >
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
        style={[styles.mudarSenhaBotao, { backgroundColor: tema.botaoFundo }]}
      >
        <Text style={[styles.mudarSenhaTexto, { color: tema.botaoTexto }]}>
          Mudar de Senha
        </Text>
      </TouchableOpacity>

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
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20, 
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
    alignSelf: 'center',
  },

  slider: {
    flex: 1,
  },
  
  sliderText: {
    width: 50,
    textAlign: 'right',
  },

  temaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 80,
    maxWidth: 150,
    alignSelf: 'center',

  },
  temaTexto: {
    textDecorationLine: 'underline',
    fontSize: 16,
    marginLeft: 10,
  },
  mudarSenhaBotao: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  mudarSenhaTexto: {
    fontWeight: 'bold',
  },
  voltarButton: {
    backgroundColor: '#BDBDBD',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'center',
  },
  voltarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});