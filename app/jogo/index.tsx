import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, useWindowDimensions, Modal } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function JogoScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPararVisible, setModalPararVisible] = useState(false);

  const isDesktop = width > 768;

  const cores = {
    fundo: isDark ? '#000' : '#fff',
    texto: isDark ? '#fff' : '#000',
    box: '#2E2E54',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: cores.fundo }]}> 
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={cores.fundo} />
      <View style={[styles.content, isDesktop && styles.contentDesktop]}>

        <TouchableOpacity
          style={[styles.perguntaBox, { backgroundColor: cores.box }]}
          onPress={() => setModalVisible(true)}
        > 
          <Text style={styles.perguntaTexto}>Exemplo pergunta{"\n"}a ...{"\n"}b ...{"\n"}c ...{"\n"}d ...</Text>
        </TouchableOpacity>

        <View style={styles.respostasGrid}>
          <View style={styles.linhaResposta}>
            <TouchableOpacity style={[styles.respostaBotao, { backgroundColor: 'red' }]}><Text style={styles.respostaTexto}>A</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.respostaBotao, { backgroundColor: 'lime' }]}><Text style={styles.respostaTexto}>B</Text></TouchableOpacity>
          </View>
          <View style={styles.linhaResposta}>
            <TouchableOpacity style={[styles.respostaBotao, { backgroundColor: 'magenta' }]}><Text style={styles.respostaTexto}>C</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.respostaBotao, { backgroundColor: 'blue' }]}><Text style={styles.respostaTexto}>D</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.ajudaContainer}>
          <TouchableOpacity style={styles.ajudaBotao}><Ionicons name="arrow-forward" size={20} color="#fff" /></TouchableOpacity>
          <TouchableOpacity style={styles.ajudaBotao}><Text style={styles.ajudaTexto}>1/2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.ajudaBotao}><Text style={styles.ajudaTexto}>Dica</Text></TouchableOpacity>
        </View>

        <View style={styles.premiosContainer}>
          <View style={[styles.premioBox, { backgroundColor: cores.box }]}> <Text style={styles.premioTexto}>Errar{"\n"}1500</Text></View>
          <View style={[styles.premioBox, { backgroundColor: cores.box }]}> <Text style={styles.premioTexto}>Parar{"\n"}3000</Text></View>
          <View style={[styles.premioBox, { backgroundColor: cores.box }]}> <Text style={styles.premioTexto}>Acertar{"\n"}4000</Text></View>
        </View>

        <TouchableOpacity style={styles.botaoParar} onPress={() => setModalPararVisible(true)}>
          <Text style={styles.botaoPararTexto}>parar</Text>
        </TouchableOpacity>

      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.fecharModal} onPress={() => setModalVisible(false)}>
              <Text style={styles.fecharModalTexto}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTexto}>Exemplo pergunta completa com alternativas:
            {"\n"}a) alternativa A
            {"\n"}b) alternativa B
            {"\n"}c) alternativa C
            {"\n"}d) alternativa D</Text>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalPararVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalPararVisible(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.fecharModal} onPress={() => setModalPararVisible(false)}>
              <Text style={styles.fecharModalTexto}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTexto}>VOCÊ TEM CERTEZA QUE QUER PARAR?{"\n\n\n"}Recompensa: X R$</Text>
            <TouchableOpacity style={styles.botaoParar} onPress={() => console.log("Confirmar Parar")}> 
              <Text style={styles.botaoPararTexto}>PARAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contentDesktop: {
    paddingHorizontal: 40,
  },
  perguntaBox: {
    width: '90%',
    borderRadius: 10,
    padding: 16,
    maxWidth: 800,
  },
  perguntaTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  respostasGrid: {
    gap: 20,
  },
  linhaResposta: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  respostaBotao: {
    width: 140,
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  respostaTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  ajudaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  ajudaBotao: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E2E54',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ajudaTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  premiosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    gap: 20,
  },
  premioBox: {
    padding: 10,
    borderRadius: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  premioTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoParar: {
    borderColor: 'red',
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 100,
    marginTop: 20,
  },
  botaoPararTexto: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#2E2E54',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    position: 'relative',
  },
  modalTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  fecharModal: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  fecharModalTexto: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
  },
});