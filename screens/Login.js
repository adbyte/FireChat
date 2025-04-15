import React, { useState } from 'react';
import {  View, Text, StyleSheet, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const backImage = require('../assets/1.png');

const showMessage = (title, message) => {
    if (Platform.OS === 'web') {
        alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onhandleLogin = () => {
    if (email === '' || password === '') {
      showMessage('Missing Fields', 'Please enter both email and password.');
      return;
    }

    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(() => {
        showMessage('Success', 'Logged in successfully!');
        
      })
      .catch((error) => {
        console.log('Login error:', error.message);
        showMessage('Login Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={onhandleLogin}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'orange',
    alignSelf: 'center',
    paddingTop: 80,
  },
  input: {
    backgroundColor: '#F2F0EF',
    height: 50,
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    padding: 10,
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: "75%",
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: 'orange',
    width: '100%',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
