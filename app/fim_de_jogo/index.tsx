import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function FimDeJogoScreen() {
  const router = useRouter();
  const { dinheiro, respondidas, total } = useLocalSearchParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const dinheiroFormatado = Number(dinheiro).toLocaleString('pt-BR');
  const respondidasFormatado = respondidas ?? '0';
  const totalFormatado = total ?? '0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#2c2c4c' }]}>Fim de jogo</Text>
        <Text style={[styles.info, { color: isDark ? '#fff' : '#2c2c4c' }]}>
          Você ganhou {dinheiroFormatado} reais
        </Text>
        <Text style={[styles.info, { color: isDark ? '#fff' : '#2c2c4c' }]}>
          Você respondeu corretamente {respondidasFormatado} perguntas de {totalFormatado}
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/jogo_menu')}>
          <Text style={styles.buttonText}>VOLTAR PARA O MENU</Text>
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
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#b0b0b0',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
