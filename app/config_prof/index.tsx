
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function ConfigProfScreen(): React.JSX.Element {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const tema = {
    fundo: isDark ? '#000' : '#F7F7F7',
    texto: isDark ? '#fff' : '#000',
    voltarBg: isDark ? '#888' : '#C0C0C0',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: tema.texto }]}>Configurações</Text>

        <TouchableOpacity style={styles.themeRow} onPress={toggleTheme}>
          <Feather name="moon" size={20} color={tema.texto} style={{ marginRight: 8 }} />
          <Text style={[styles.themeText, { color: tema.texto }]}>Modo {isDark ? 'Claro' : 'Escuro'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.voltar, { backgroundColor: tema.voltarBg }]} onPress={() => router.back()}>
          <Text style={[styles.voltarText, { color: tema.texto }]}>← Voltar</Text>
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
    gap: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  voltar: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  voltarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
