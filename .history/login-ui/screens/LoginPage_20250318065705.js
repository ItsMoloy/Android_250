import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      console.log('Email:', email);
      console.log('Password:', password);
      navigation.navigate('Home'); // Navigate to HomePage after login
    } else {
      alert('Please fill in both email and password');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to SignUpPage when clicked
  };

  return (
    <ImageBackground
      source={{ uri: 'https://plus.unsplash.com/premium_photo-1664304370934-b21ea9e0b1f5?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      style={styles.background}
      resizeMode="repeat"
    >
      <View style={styles.overlay}>
        <Animated.Text style={styles.title} entering={FadeIn} exiting={FadeOut}>
          Hospital Appointment System
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
            Don't have an account?{' '}
            <Text style={styles.link} onPress={handleSignUp}>
              Sign Up
            </Text>
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
