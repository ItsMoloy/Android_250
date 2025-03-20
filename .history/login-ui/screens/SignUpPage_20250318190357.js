// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

// const SignUpPage = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignUp = () => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Gmail format regex
//     if (!emailRegex.test(email)) {
//       alert('Please enter a valid Gmail address.');
//     } else if (password !== confirmPassword) {
//       alert('Passwords do not match');
//     } else if (!username || !password || !confirmPassword) {
//       alert('Please fill in all fields');
//     } else {
//       console.log('Username:', username);
//       console.log('Email:', email);
//       console.log('Password:', password);
//       navigation.navigate('Home'); // Proceed to HomePage after successful sign up
//     }
//   };

//   return (
//     <ImageBackground
//       source={{ uri: 'https://plus.unsplash.com/premium_photo-1664304370934-b21ea9e0b1f5?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
//       style={styles.background}
//       resizeMode="repeat"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Hospital Appointment System</Text>

//         <View style={styles.card}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your username"
//             value={username}
//             onChangeText={setUsername}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email (your-email@gmail.com)"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Confirm your password"
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry
//           />

//           <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   overlay: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#fff',
//   },
//   card: {
//     width: '90%', // Increased width for inputs
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     padding: 20,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//     alignItems: 'center',
//   },
//   input: {
//     height: 45,
//     marginBottom: 12,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     fontSize: 16,
//     width: '100%', // Ensure the fields are stretched to fill the width of the container
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '90%',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SignUpPage;
