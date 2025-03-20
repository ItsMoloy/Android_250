import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');

  const handleLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid Gmail address.');
    } else if (!password) {
      alert('Please enter your password.');
    } else {
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('User Type:', userType);


      switch(userType) {
        case 'doctor':
          navigation.navigate('DoctorDashboard');
          break;
        case 'admin':
          navigation.navigate('AdminDashboard');
          break;
        default:
          navigation.navigate('Home'); 
      }
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://plus.unsplash.com/premium_photo-1664304370934-b21ea9e0b1f5?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      style={styles.background}
      resizeMode="repeat"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Hospital Appointment System</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Login</Text>

          {/* User Type Selection */}
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === 'patient' && styles.selectedUserType]}
              onPress={() => setUserType('patient')}
            >
              <Text style={[styles.userTypeText, userType === 'patient' && styles.selectedUserTypeText]}>
                Patient
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.userTypeButton, userType === 'doctor' && styles.selectedUserType]}
              onPress={() => setUserType('doctor')}
            >
              <Text style={[styles.userTypeText, userType === 'doctor' && styles.selectedUserTypeText]}>
                Doctor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.userTypeButton, userType === 'admin' && styles.selectedUserType]}
              onPress={() => setUserType('admin')}
            >
              <Text style={[styles.userTypeText, userType === 'admin' && styles.selectedUserTypeText]}>
                Admin
              </Text>
            </TouchableOpacity>
          </View>

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
          </TouchableOpacity>

          {userType === 'patient' && (
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.link} onPress={navigateToSignUp}>
                Sign Up
              </Text>
            </Text>
          )}
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
    width: '90%',
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
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  userTypeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedUserType: {
    backgroundColor: '#007bff',
  },
  userTypeText: {
    fontWeight: '500',
    color: '#555',
  },
  selectedUserTypeText: {
    color: '#fff',
  },
  input: {
    height: 45,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
  },
  buttonText: {
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