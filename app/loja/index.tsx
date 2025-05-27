import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';

export default function LojaScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [dinheiro, setDinheiro] = useState(0);

  const precos = {
    pula: 80000,
    elimina2: 50000,
    dica: 20000,
  };

  const tema = {
    fundo: isDark ? '#000' : '#FAFAFA',
    texto: isDark ? '#fff' : '#000',
    voltar: isDark ? '#555' : '#BDBDBD',
    ativo: '#4C9A81',
    inativo: '#383838',
  };

  useEffect(() => {
    const carregarDados = async () => {
      const idAluno = await AsyncStorage.getItem('idAluno');
      if (!idAluno) return;

      const res = await fetch(`http://localhost:8000/perfil_aluno?idAluno=${idAluno}`);
      const dados = await res.json();
      setDinheiro(dados.dinheiro || 0);
    };
    carregarDados();
  }, []);

  const comprarItem = async (tipo, preco) => {
    const idAluno = await AsyncStorage.getItem('idAluno');
    if (dinheiro < preco) return;

    try {
      const res = await fetch('http://localhost:8000/comprar_powerup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idAluno: Number(idAluno), tipo }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setDinheiro(prev => prev - preco);
        Alert.alert('Compra realizada com sucesso!');
      } else {
        Alert.alert('Erro:', data.detail || 'Erro desconhecido');
      }
    } catch (err) {
      console.error("Erro ao comprar:", err);
      Alert.alert("Erro ao se comunicar com o servidor.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>Power-Ups</Text>
      <Text style={[styles.dinheiroTexto, { color: tema.texto }]}>Seu saldo: R$ {dinheiro.toLocaleString('pt-BR')}</Text>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: dinheiro >= precos.pula ? tema.ativo : tema.inativo }]}
        onPress={() => comprarItem('pula', precos.pula)}
        disabled={dinheiro < precos.pula}
      >
        <Text style={styles.botaoTexto}>Pula Pergunta</Text>
        <Text style={styles.botaoTexto}>R$ {precos.pula.toLocaleString('pt-BR')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: dinheiro >= precos.elimina2 ? tema.ativo : tema.inativo }]}
        onPress={() => comprarItem('elimina', precos.elimina2)}
        disabled={dinheiro < precos.elimina2}
      >
        <Text style={styles.botaoTexto}>Elimina 2 Alternativas</Text>
        <Text style={styles.botaoTexto}>R$ {precos.elimina2.toLocaleString('pt-BR')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: dinheiro >= precos.dica ? tema.ativo : tema.inativo }]}
        onPress={() => comprarItem('dica', precos.dica)}
        disabled={dinheiro < precos.dica}
      >
        <Text style={styles.botaoTexto}>Dica</Text>
        <Text style={styles.botaoTexto}>R$ {precos.dica.toLocaleString('pt-BR')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botaoVoltar, { backgroundColor: tema.voltar }]}
        onPress={() => router.replace('/jogo_menu')}
      >
        <Text style={styles.textoVoltar}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dinheiroTexto: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  botao: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    maxWidth: 500,
    width: '100%',
    gap: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  botaoVoltar: {
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    maxWidth: 500,
    width: '100%',
    marginTop: 30,
  },
  textoVoltar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
