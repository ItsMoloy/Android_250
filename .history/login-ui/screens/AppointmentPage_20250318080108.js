import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const AppointmentPage = ({ route }) => {
  const { doctor } = route.params; // Get the doctor details passed from HomePage

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleAppointment = () => {
    console.log('Appointment Booked:', { name, date, time });
    alert('Your appointment has been booked successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Display the selected doctor's image and details */}
      <View style={styles.doctorInfo}>
        <Image source={doctor.image} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
      </View>

      <Text style={styles.title}>Book Your Appointment</Text>
      <TextInput style={styles.input} placeholder="Your Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="Time (HH:MM AM/PM)" value={time} onChangeText={setTime} />
      <Button title="Confirm Appointment" onPress={handleAppointment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  doctorInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#777',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AppointmentPage; 