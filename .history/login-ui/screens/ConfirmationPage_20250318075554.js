import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs'; // For saving the file

const ConfirmationPage = ({ route, navigation }) => {
  const { doctor, name, date, time } = route.params;

  const generatePDF = async () => {
    try {
      const htmlContent = `
        <h1>Appointment Confirmation</h1>
        <h2>Doctor Details:</h2>
        <img src="${doctor.image}" width="100" height="100" style="border-radius: 50%;" />
        <p><strong>Name:</strong> ${doctor.name}</p>
        <p><strong>Specialty:</strong> ${doctor.specialty}</p>
        <h3>Appointment Details:</h3>
        <p><strong>Your Name:</strong> ${name}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      `;

      const options = {
        html: htmlContent,
        fileName: 'Appointment_Confirmation',
        directory: 'Documents', // Directory to save the file
      };

      const file = await RNHTMLtoPDF.convert(options);

      // If you're on Android, request permissions for file writing
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permission to write to storage',
            message: 'We need access to your storage to save the document',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Success', `File saved to ${file.filePath}`);
        } else {
          Alert.alert('Permission Denied', 'You need to allow storage permissions.');
        }
      } else {
        Alert.alert('Success', `File saved to ${file.filePath}`);
      }
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF. Please try again later.');
    }
  };

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

      {/* Button to generate PDF */}
      <Button title="Download Appointment PDF" onPress={generatePDF} />
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
