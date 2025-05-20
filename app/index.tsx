import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';

import {
  StyleSheet, Text, View, TouchableOpacity,
  SafeAreaView, StatusBar,Image 
} from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen(): React.JSX.Element {
  const { theme } = useTheme();
  const router = useRouter();

  const handleLoginPress = () => {
    router.push('/login');
  };

  const handleCadastroPress = (): void => {
    router.push('/cadastro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>

      <Image
        source={require('../assets/images/PoliedroLogo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      

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
    marginBottom: 32,
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

  logo: {
    width: 175,
    height: 175,
    marginBottom: 80,
  },

});