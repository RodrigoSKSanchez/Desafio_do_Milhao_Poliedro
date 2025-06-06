
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

export default function MenuProfessor(): React.JSX.Element {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tema = {
    fundo: isDark ? '#000' : '#F7F7F7',
    texto: isDark ? '#fff' : '#000',
    voltar: '#C0C0C0',
    perguntas: '#468b98',
    alunos: '#fde276',
    icone: isDark ? '#fff' : '#000',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />

      <View style={styles.content}>
        <TouchableOpacity style={[styles.button, { backgroundColor: tema.perguntas }]}>
          <Text style={[styles.buttonText, { color: tema.texto }]}>Perguntas</Text>
          <Feather name="help-circle" size={20} color={tema.icone} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: tema.alunos }]}>
          <Text style={[styles.buttonText, { color: tema.texto }]}>Alunos</Text>
          <Feather name="user" size={20} color={tema.icone} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: tema.voltar }]} onPress={() => router.push('/')}>
          <Text style={[styles.buttonText, { color: tema.texto, fontWeight: 'bold' }]}>VOLTAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.settingsIcon} onPress={() => router.push('/config_prof')}>
        <Feather name="settings" size={24} color={tema.icone} />
      </TouchableOpacity>
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
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
  },
  buttonText: {
    fontSize: 16,
  },
  settingsIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 16,
  },
});
