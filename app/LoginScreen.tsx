import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, GestureResponderEvent } from 'react-native';

export default function LoginScreen(): React.JSX.Element {
  // Funções com tipagem para os handlers dos botões
  const handleLoginPress = (): void => {
    console.log('Login pressionado');
  };

  const handleCadastroPress = (): void => {
    console.log('Cadastro pressionado');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <Text style={styles.title}>Show do Milhão</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLoginPress}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleCadastroPress}
        >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// Definindo tipos para os estilos
type Styles = {
  container: object;
  content: object;
  title: object;
  button: object;
  buttonText: object;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#000',
  },
  button: {
    backgroundColor: '#2E2E54',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, 
    maxWidth: 400,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

