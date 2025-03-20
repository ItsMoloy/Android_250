import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const doctors = [
  { id: '1', name: 'Dr. Ayesha Khan', specialty: 'Cardiologist', image: require('../assets/doctor1.') },
  { id: '2', name: 'Dr. Rahul Sen', specialty: 'Neurologist', image: require('../assets/doctor2.png') },
  { id: '3', name: 'Dr. Tanvir Ahmed', specialty: 'Orthopedic', image: require('../assets/doctor3.png') },
];

const HomePage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* হেডার */}
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.header}>
        <Text style={styles.headerText}>🏥 Hospital Appointment</Text>
      </Animated.View>

      {/* বিশেষজ্ঞ ডাক্তারদের তালিকা */}
      <Text style={styles.sectionTitle}>🔹 Top Doctors</Text>
      <FlatList
        data={doctors}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.doctorCard} onPress={() => navigation.navigate('Appointment')}>
            <Image source={item.image} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
          </TouchableOpacity>
        )}
      />

      {/* অ্যাপয়েন্টমেন্ট বুকিং */}
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
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
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
