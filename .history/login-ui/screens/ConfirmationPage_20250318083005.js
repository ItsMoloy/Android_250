import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library'; // Use MediaLibrary
import { shareAsync } from 'expo-sharing';

const ConfirmationPage = ({ route, navigation }) => {
  const { doctor, name, date, time } = route.params;
  const viewRef = useRef(); // Reference for capturing screenshot

  useEffect(() => {
    // Request permission for media library access when the component is mounted
    const getPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please grant access to save the image.');
      }
    };

    getPermission();
  }, []);

  const captureScreenshot = async () => {
    try {
      const uri = await captureRef(viewRef.current, {
        format: 'jpg',
        quality: 0.8,
      });

      // Define the file path where the image will be saved
      const fileUri = `${FileSystem.documentDirectory}Appointment_Confirmation.jpg`;

      // Move the image from the captured URI to the new fileUri
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      // Save the file to the media library
      await MediaLibrary.saveToLibraryAsync(fileUri);

      // Show success message
      Alert.alert('Success', 'Image saved successfully!');

      // Share the image file
      shareAsync(fileUri);
    } catch (error) {
      console.error('Screenshot error:', error);
      Alert.alert('Error', 'Failed to capture screenshot');
    }
  };

  return (
    <View style={styles.container}>
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
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: 'white' },
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
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  doctorInfo: { alignItems: 'center', marginBottom: 20 },
  doctorImage: { width: 12, height: 100, borderRadius: 50, marginBottom: 10 },
  doctorName: { fontSize: 20, fontWeight: 'bold' },
  doctorSpecialty: { fontSize: 16, color: '#777' },
  appointmentDetails: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  details: { fontSize: 16, marginBottom: 8 },
});

export default ConfirmationPage;
