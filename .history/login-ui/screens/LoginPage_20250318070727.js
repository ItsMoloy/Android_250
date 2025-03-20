import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Gmail format regex
    if (!emailRegex.test(email)) {
      alert('Please enter a valid Gmail address.');
    } else {
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Password:', password);
      navigation.navigate('Home'); // Proceed to HomePage after validation
    }
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
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your email (your-email@gmail.com)"
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

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpa
