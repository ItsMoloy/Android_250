import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const doctors = [
  { id: '1', name: 'Dr. Ayesha Khan', specialty: 'Cardiologist', image: require('../assets/doctor1.jpeg') },
  { id: '2', name: 'Dr. Rahul Sen', specialty: 'Neurologist', image: require('../assets/doctor2.jpeg') },
  { id: '3', name: 'Dr. Tanvir Ahmed', specialty: 'Orthopedic', image: require('../assets/doctor3.jpeg') },
  { id: '4', name: 'Dr. Tasnova Tarannum', specialty: 'Gastroenterologist', image: require('../assets/doctor4.jpeg') },
  { id: '5', name: 'Dr. Nayeem Hasan', specialty: 'Pediatrician', image: require('../assets/doctor5.jpeg') },
  { id: '6', name: 'Dr. Shakib Khan', specialty: 'Psychiatrist', image: require('../assets/doctor6.jpeg') },
];

const HomePage = ({ navigation }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected doctor when clicked
  };

  const handleAppointment = () => {
    if (selectedDoctor) {
      // Pass the selected doctor's details when navigating to the AppointmentPage
      navigation.navigate('Appointment', { doctor: selectedDoctor });
    } else {
      alert('Please select a doctor first!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.header}>
        <Text style={styles.headerText}>🏥 Hospital Appointment</Text>
      </Animated.View>

      <Text style={styles.sectionTitle}>🔹 Top Doctors</Text>
      <FlatList
        data={doctors}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.doctorCard,
              selectedDoctor?.id === item.id && styles.selectedDoctorCard, // Highlight selected doctor
            ]}
            onPress={() => handleDoctorSelect(item)} // Set selected doctor
          >
            <Image source={item.image} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>📅 Book an Appointment</Text>
      <TouchableOpacity style={styles.appointmentButton} onPress={handleAppointment}>
        <Text style={styles.buttonText}>Make an Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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

export default HomePage;
