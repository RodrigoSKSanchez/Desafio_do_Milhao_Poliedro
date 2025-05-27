import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function LojaScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tema = {
    fundo: isDark ? '#000' : '#FAFAFA',
    texto: isDark ? '#fff' : '#000',
    voltar: isDark ? '#555' : '#BDBDBD',
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.title, { color: tema.texto }]}>Tela de Teste da Loja</Text>
      <TouchableOpacity
        style={[styles.botaoVoltar, { backgroundColor: tema.voltar }]}
        onPress={() => router.back()}
      >
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  textoVoltar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});