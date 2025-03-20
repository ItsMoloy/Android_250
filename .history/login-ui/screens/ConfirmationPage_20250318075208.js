import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const ConfirmationPage = ({ route, navigation }) => {
  const { doctor, name, date, time } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Confirmation</Text>

      {/* Display the selected doctor's details */}
      <View style={styles.doctorInfo}>
        <Image source={doctor.image} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
      </View>

      <Text style={styles.appointmentDetails}>Appointment Details:</Text>
      <Text style={styles.details}>Name: {name}</Text>
      <Text style={styles.details}>Date: {date}</Text>
      <Text style={styles.details}>Time: {time}</Text>

      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  appointmentDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ConfirmationPage;
