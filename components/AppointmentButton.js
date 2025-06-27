// components/AppointmentButton.js
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AppointmentButton = ({ onPress, selectedDoctor }) => {
  const isSelected = !!selectedDoctor;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={isSelected ? ['#ff6b6b', '#feca57'] : ['#bbb', '#999']}
        style={styles.gradient}
      >
        <Text style={styles.text}>
          {isSelected ? '📅 Book Appointment' : '👆 Select a Doctor First'}
        </Text>
        {isSelected && (
          <Text style={styles.subtext}>with {selectedDoctor.name}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 6,
  },
  gradient: {
    padding: 18,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  subtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
});

export default AppointmentButton;
