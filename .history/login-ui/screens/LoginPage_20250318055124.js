import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { TextInput, Button, } from 'react-native-paper';
import Animated, { FadeIn, FadeOut, SlideInLeft } from 'react-native-reanimated';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut} style={styles.card}>
        <Animated.Text style={styles.title} entering={SlideInLeft.duration(800)}>
          Hospital Appointment System
        </Animated.Text>

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={secureText ? 'eye-off' : 'eye'}
              onPress={() => setSecureText(!secureText)}
            />
          }
          style={styles.input}
        />

        <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
          Login
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.link}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
  },
  footerText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#555',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LoginPage;
