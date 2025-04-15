import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Fire logo asset
const fireLogo = require('../assets/fire.png');

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={fireLogo} style={styles.logo} />
      <Text style={styles.title}>Welcome to FireChat</Text>
      <Text style={styles.description}>
        The best chat experience powered by fire!
      </Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 3,  // Adds a subtle shadow for a more professional look
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
