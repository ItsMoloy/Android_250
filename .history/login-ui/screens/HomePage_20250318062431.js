import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const doctors = [
  { id: '1', name: 'Dr. Ayesha Khan', specialty: 'Cardiologist', image: require('../assets/doctor1.jpeg') },
  { id: '2', name: 'Dr. Rahul Sen', specialty: 'Neurologist', image: require('../assets/doctor2.jpeg') },
  { id: '3', name: 'Dr. Tanvir Ahmed', specialty: 'Orthopedic', image: require('../assets/doctor3.jpeg') },
  { id: '4', name: 'Dr. Ayesha Khan', specialty: 'Cardiologist', image: require('../assets/doctor1.jpeg') },
  { id: '5', name: 'Dr. Nayeem Hasan', specialty: 'Neurologist', image: require('../assets/doctor2.jpeg') },
  { id: '6', name: 'Dr. Shakib Khan', specialty: 'Orthopedic', image: require('../assets/doctor3.jpeg') },
];

const HomePage = ({ navigation }) => {
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
          <TouchableOpacity style={styles.doctorCard} onPress={() => navigation.navigate('Appointment')}>
            <Image source={item.image} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>📅 Book an Appointment</Text>
      <TouchableOpacity style={styles.appointmentButton} onPress={() => navigation.navigate('Appointment')}>
        <Text style={styles.buttonText}>Make an Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  doctorCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    width: '30%',
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#777',
  },
  appointmentButton: {
    backgroundColor: '#ff5722',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomePage;
