import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // For database storage
import auth from '@react-native-firebase/auth'; // For user authentication

const AppointmentPage = ({ route, navigation }) => {
  const { doctor } = route.params; // Get the doctor details passed from HomePage

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAppointment = async () => {
    if (!name || !date || !time) {
      alert('Please fill all fields!');
      return;
    }

    try {
      setLoading(true);

      // Create appointment data object
      const appointmentData = {
        patientName: name,
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: date,
        time: time,
        status: 'pending', // initial status
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Get current user ID if authenticated
      const currentUser = auth().currentUser;
      if (currentUser) {
        appointmentData.patientId = currentUser.uid;
        appointmentData.patientEmail = currentUser.email;
      } else {
        alert('You need to be logged in to book an appointment.');
        return; // Exit if user is not logged in
      }

      // Save appointment to Firestore
      const appointmentRef = await firestore()
        .collection('appointments')
        .add(appointmentData);

      // Update the appointment with its ID
      await appointmentRef.update({
        appointmentId: appointmentRef.id
      });

      // Send notification to doctor
      await firestore()
        .collection('notifications')
        .add({
          recipientId: doctor.id,
          recipientType: 'doctor',
          title: 'New Appointment',
          message: `${name} has requested an appointment on ${date} at ${time}`,
          appointmentId: appointmentRef.id,
          read: false,
          createdAt: new Date()
        });

      // Send notification to admin
      await firestore()
        .collection('notifications')
        .add({
          recipientType: 'admin',
          title: 'New Appointment Booking',
          message: `${name} booked an appointment with Dr. ${doctor.name} on ${date} at ${time}`,
          appointmentId: appointmentRef.id,
          read: false,
          createdAt: new Date()
        });

      // Navigate to Confirmation Page with appointment details
      navigation.navigate('Confirmation', {
        doctor,
        name,
        date,
        time,
        appointmentId: appointmentRef.id
      });

    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
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

      <Button
        title={loading ? "Processing..." : "Confirm Appointment"}
        onPress={handleAppointment}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  doctorInfo: { alignItems: 'center', marginBottom: 20 },
  doctorImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  doctorName: { fontSize: 20, fontWeight: 'bold' },
  doctorSpecialty: { fontSize: 16, color: '#777' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
});

export default AppointmentPage;