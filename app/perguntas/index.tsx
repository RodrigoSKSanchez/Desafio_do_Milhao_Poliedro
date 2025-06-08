// app/config_prof/index.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function ConfigProfScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tema = {
    fundo: isDark ? '#000' : '#F7F7F7',
    texto: isDark ? '#fff' : '#000',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={tema.fundo}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: tema.texto }]}>
          Tela de Perguntas do Professor
        </Text>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.push('/menu_professor')}
        >
          <Text style={styles.voltarTexto}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  botaoVoltar: {
    backgroundColor: '#2E2E54',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  voltarTexto: {
    color: '#fff',
    fontSize: 16,
  },
});
