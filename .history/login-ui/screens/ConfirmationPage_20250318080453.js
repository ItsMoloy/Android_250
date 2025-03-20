import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import * as Print from 'expo-print';

const ConfirmationPage = ({ route, navigation }) => {
  const { doctor, name, date, time } = route.params;

  const generatePDF = async () => {
    const html = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="text-align: center;">Appointment Confirmation</h1>
          <div style="text-align: center;">
            <img src="${doctor.image.uri}" style="width: 100px; height: 100px; border-radius: 50px;" />
            <h2>${doctor.name}</h2>
            <h3>${doctor.specialty}</h3>
          </div>
          <h2>Appointment Details:</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log('PDF generated at:', uri);

      const pdfUri = `${FileSystem.documentDirectory}Appointment_Confirmation.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: pdfUri,
      });

      Alert.alert('Success', 'PDF saved successfully!');
      shareAsync(pdfUri);
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert('Error', 'Failed to generate PDF');
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

      <Button title="Download Confirmation" onPress={generatePDF} />
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
