import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Asset } from 'expo-asset'

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={require('../../assets/hospital-bg.jpeg')} // Replace with your image name
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.Text style={styles.title} entering={FadeIn} exiting={FadeOut}>
          Welcome Back!
        </Animated.Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.link}>Sign Up</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  card: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    height: 45,
    width: '90%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LoginPage;
