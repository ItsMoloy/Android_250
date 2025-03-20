import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

const ConfirmationPage = ({ route, navigation }) => {
  const { doctor, name, date, time } = route.params;
  const [paymentDone, setPaymentDone] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const appointmentFee = 500; 

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
              <p><strong>Transaction ID:</strong> ${transactionId}</p>
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

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    // Validate inputs
    if (phoneNumber.length !== 11) {
      Alert.alert('Invalid Input', 'Please enter a valid 11-digit phone number');
      return;
    }

    if (pin.length !== 4) {
      Alert.alert('Invalid Input', 'Please enter a valid 4-digit PIN');
      return;
    }

    // Simulate payment processing
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      setShowPaymentModal(false);

      // Generate a fake transaction ID
      const fakeTransactionId = 'TRX' + Math.floor(Math.random() * 10000000);
      setTransactionId(fakeTransactionId);

      Alert.alert(
        'Payment Successful',
        `Your payment of ${appointmentFee} BDT has been processed. Transaction ID: ${fakeTransactionId}`
      );

      setPaymentDone(true);
    }, 2000);
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
      <Text style={styles.paymentAmount}>Fee: {appointmentFee} BDT</Text>

      {!paymentDone ? (
        <Button
          title="Pay with bKash"
          onPress={handlePayment}
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

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.paymentModal}>
            <Text style={styles.modalTitle}>bKash Payment</Text>

            <View style={styles.bkashHeader}>
              <Image
                source={require('../assets/bkash-logo.png')}
                style={styles.bkashLogo}
                resizeMode="contain"
              />
              <Text style={styles.amountText}>Amount: {appointmentFee} BDT</Text>
            </View>

            <Text style={styles.inputLabel}>bKash Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="01XXXXXXXXX"
              keyboardType="phone-pad"
              maxLength={11}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            <Text style={styles.inputLabel}>PIN</Text>
            <TextInput
              style={styles.input}
              placeholder="****"
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
              value={pin}
              onChangeText={setPin}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowPaymentModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.payButton]}
                onPress={processPayment}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Processing...' : 'Confirm Payment'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  backButton: {
    marginTop: 15
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  paymentModal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  bkashHeader: {
    alignItems: 'center',
    marginBottom: 20
  },
  bkashLogo: {
    width: 120,
    height: 50,
    marginBottom: 10
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E2136E'
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10
  },
  button: {
    padding: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#999'
  },
  payButton: {
    backgroundColor: '#E2136E'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ConfirmationPage;