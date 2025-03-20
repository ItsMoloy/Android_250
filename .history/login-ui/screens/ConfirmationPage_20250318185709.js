import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

const ConfirmationPage = ({ route, navigation }) => {
  const { doctor, name, date, time } = route.params;

  useEffect(() => {
    // Request storage permission (for Android)
    const requestPermission = async () => {
      const { status } = await Print.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow storage access to save the PDF.');
      }
    };
    requestPermission();
  }, []);

  const generatePDF = async () => {
    try {
      // HTML content for the PDF
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              h1 { color: #2E86C1; }
              .details { margin-top: 20px; font-size: 18px; }
              .doctor-info { margin-top: 20px; }
              img { width: 150px; height: 150px; border-radius: 10px; }
            </style>
          </head>
          <body>
            <h1>Appointment Confirmation</h1>
            <div class="doctor-info">
              <img src="${doctor.image}" alt="Doctor Image" />
              <h2>${doctor.name}</h2>
              <p>${doctor.specialty}</p>
            </div>
            <div class="details">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>
          </body>
        </html>
      `;

      // Generate PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Define file location
      const fileUri = `${FileSystem.documentDirectory}Appointment_Confirmation.pdf`;

      // Move the file to a permanent location
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      // Show success message
      Alert.alert('Success', 'PDF saved successfully!');

      // Allow sharing
      await shareAsync(fileUri);

    } catch (error) {
      console.error('PDF Error:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Confirmation</Text>

      <View style={styles.doctorInfo}>
        <Image source={doctor.image} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
      </View>

      <Text style={styles.appointmentDetails}>Appointment Details:</Text>
      <Text style={styles.details}>Name: {name}</Text>
      <Text style={styles.details}>Date: {date}</Text>
      <Text style={styles.details}>Time: {time}</Text>

      <Button title="Download as PDF" onPress={generatePDF} />
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  doctorInfo: { alignItems: 'center', marginBottom: 20 },
  doctorImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  doctorName: { fontSize: 20, fontWeight: 'bold' },
  doctorSpecialty: { fontSize: 16, color: '#777' },
  appointmentDetails: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  details: { fontSize: 16, marginBottom: 8 },
});

export default ConfirmationPage;
//I have 