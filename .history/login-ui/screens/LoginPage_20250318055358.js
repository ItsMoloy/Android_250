import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can replace this with your real login logic, like API requests
    console.log('Email:', email);
    console.log('Password:', password);

    // If login is successful, navigate to the home page
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.title} entering={FadeIn} exiting={FadeOut}>
        Login
      </Animated.Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <Animated.Text style={styles.footer}>
        Don't have an account? <Text style={styles.link}>Sign Up</Text>
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
  },
});

export default LoginPage;