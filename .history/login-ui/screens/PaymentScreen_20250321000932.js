import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = ({ navigation, route }) => {
  const { doctor, name, date, time } = route.params;
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // এখানে তোমার সার্ভার থেকে পেমেন্ট ইনটেন্ট ফেচ করতে হবে
    const response = await fetch('https://your-server.com/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000, currency: 'usd' }) // 50 USD
    });

    const { clientSecret, error } = await response.json();

    if (error) {
      Alert.alert('Payment Failed', error);
      setLoading(false);
      return;
    }

    const { error: paymentError } = await stripe.confirmPayment(clientSecret);

    if (paymentError) {
      Alert.alert('Payment Error', paymentError.message);
      setLoading(false);
    } else {
      Alert.alert('Payment Successful', 'Your appointment is confirmed!');
      setLoading(false);
      navigation.replace('Confirmation', { doctor, name, date, time });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Make Payment for Appointment</Text>
      <Button title={loading ? 'Processing...' : 'Pay $50'} onPress={handlePayment} disabled={loading} />
    </View>
  );
};

export default PaymentScreen;
