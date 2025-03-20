import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

const ConfirmationPage = ({ route, navigation }) => {
  const { doctor, name, date, time } = route.params;
  const viewRef = useRef(); // Reference for capturing screenshot

  const captureScreenshot = async () => {
    try {
      const uri = await captureRef(viewRef.current, {
        format: 'jpg', // You can change this to 'png'
        quality: 0.8,
      });

      const fileUri = `${FileSystem.documentDirectory}Appointment_Confirmation.jpg`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      Alert.alert('Success', 'Image saved successfully!');
      shareAsync(fileUri);
    } catch (error) {
      console.error('Screenshot error:', error);
      Alert.alert('Error', 'Failed to capture screenshot');
    }
  };

  return (
    <View style={styles.container} ref={viewRef}>
      <View ref={viewRef} style={styles.innerContainer}>
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
      </View>

      <Button title="Download as Image" onPress={captureScreenshot} />
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
