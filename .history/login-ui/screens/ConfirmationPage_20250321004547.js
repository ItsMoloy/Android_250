import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, ActivityIndicator } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const API_URL = 'http://your-server-ip:5000'; // Replace with your actual server URL

const ConfirmationPage = ({ route, navigation }) => {
  const { doctor, name, date, time } = route.params;
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [bkashUrl, setBkashUrl] = useState('');
  const [paymentID, setPaymentID] = useState('');
  const [showBkash, setShowBkash] = useState(false);
  const appointmentFee = 500; // Set your appointment fee amount here

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
    if (!paymentDone) {
      Alert.alert('Payment Required', 'Please complete payment before downloading PDF.');
      return;
    }

    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              h1 { color: #2E86C1; }
              .details { margin-top: 20px; font-size: 18px; }
              .doctor-info { margin-top: 20px; }
              img { width: 150px; height: 150px; border-radius: 10px; }
              .payment-info { margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px; }
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
            <div class="payment-info">
              <p><strong>Payment ID:</strong> ${paymentID}</p>
              <p><strong>Amount Paid:</strong> ${appointmentFee} BDT</p>
              <p><strong>Payment Method:</strong> bKash</p>
              <p><strong>Payment Status:</strong> Completed</p>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      const fileUri = `${FileSystem.documentDirectory}Appointment_Confirmation.pdf`;
      await FileSystem.moveAsync({ from: uri, to: fileUri });
      Alert.alert('Success', 'PDF saved successfully!');
      await shareAsync(fileUri);
    } catch (error) {
      console.error('PDF Error:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  const initiatePayment = async () => {
    try {
      setPaymentProcessing(true);

      // Step 1: Create Payment
      const createResponse = await axios.post(`${API_URL}/create-payment`, {
        amount: appointmentFee.toString()
      });

      if (createResponse.data && createResponse.data.paymentID) {
        setPaymentID(createResponse.data.paymentID);
        setBkashUrl(createResponse.data.bkashURL);
        setShowBkash(true);
      } else {
        throw new Error('Payment creation failed');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      Alert.alert('Payment Error', 'Failed to initiate bKash payment. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleBkashResponse = async (data) => {
    // Check if the WebView is navigating to the success URL
    if (data.url && data.url.includes('status=success')) {
      setShowBkash(false);

      try {
        // Execute the payment
        const executeResponse = await axios.post(`${API_URL}/execute-payment`, {
          paymentID: paymentID
        });

        if (executeResponse.data && executeResponse.data.statusCode === '0000') {
          Alert.alert('Payment Successful', 'Your appointment is confirmed.');
          setPaymentDone(true);
        } else {
          throw new Error('Payment execution failed');
        }
      } catch (error) {
        console.error('Execute Payment Error:', error);
        Alert.alert('Payment Error', 'Payment verification failed. Please contact support.');
      }
    } else if (data.url && data.url.includes('status=cancel')) {
      setShowBkash(false);
      Alert.alert('Payment Cancelled', 'You cancelled the payment process.');
    } else if (data.url && data.url.includes('status=failure')) {
      setShowBkash(false);
      Alert.alert('Payment Failed', 'The payment process failed. Please try again.');
    }
  };

  // Render bKash WebView when payment is initiated
  if (showBkash && bkashUrl) {
    return (
      <WebView
        source={{ uri: bkashUrl }}
        onNavigationStateChange={handleBkashResponse}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
      />
    );
  }

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
      <Text style={styles.paymentAmount}>Fee: {appointmentFee} BDT</Text>

      {paymentProcessing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loadingText}>Processing payment...</Text>
        </View>
      ) : !paymentDone ? (
        <Button
          title="Pay with bKash"
          onPress={initiatePayment}
          color="#E2136E" // bKash brand color
        />
      ) : (
        <Button title="Download Confirmation" onPress={generatePDF} />
      )}

      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
        color="#555"
        style={styles.backButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  doctorInfo: {
    alignItems: 'center',
    marginBottom: 20
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#777'
  },
  appointmentDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  details: {
    fontSize: 16,
    marginBottom: 8
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555'
  },
  backButton: {
    marginTop: 15
  }
});

export default ConfirmationPage;