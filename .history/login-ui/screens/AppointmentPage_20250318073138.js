import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AppointmentPage = ({ route, navigation }) => {
  const { doctor } = route.params; // Receive doctor info passed from HomePage
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const handleAppointment = () => {
    if (!name || !date || !selectedTime) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    console.log('Appointment Booked:', { name, date, selectedTime });
    Alert.alert('Success', 'Your appointment has been booked!');
    navigation.goBack(); // Go back to HomePage after booking
  };

  const handleDateConfirm = (date) => {
    setDate(date.toISOString().split('T')[0]); // Format to YYYY-MM-DD
    setDatePickerVisibility(false);
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Your Appointment</Text>

      {/* Doctor Details */}
      <View style={styles.doctorInfo}>
        <Image source={doctor.image} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
      </View>

      {/* Calendar for Date Selection */}
      <Text style={styles.label}>Select a Date:</Text>
      <Calendar
        markedDates={{
          [date]: {
            selected: true,
            selectedColor: 'blue',
          },
        }}
        onDayPress={(day) => setDate(day.dateString)}
        monthFormat={'yyyy MM'}
      />

      {/* Time Slot Selection */}
      <Text style={styles.label}>Select a Time:</Text>
      <View style={styles.timeSlots}>
        {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'].map((timeSlot) => (
          <TouchableOpacity
            key={timeSlot}
            style={[styles.timeSlot, selectedTime === timeSlot && styles.selectedTimeSlot]}
            onPress={() => handleTimeSlotSelect(timeSlot)}
          >
            <Text style={styles.timeSlotText}>{timeSlot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* User Name Input */}
      <Text style={styles.label}>Your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Book Appointment Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleAppointment}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#777',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  selectedTimeSlot: {
    backgroundColor: '#ff5722',
  },
  timeSlotText: {
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
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

export default AppointmentPage;
