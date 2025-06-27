import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppointmentPage = ({ route, navigation }) => {
  const { doctor } = route.params; // Get the doctor details passed from HomePage

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAppointment = () => {
    if (!name || !date || !time) {
      alert('Please fill all fields!');
      return;
    }

    // Format date and time for display
    const formattedDate = date.toDateString();
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Navigate to Confirmation Page with appointment details
    navigation.navigate('Confirmation', {
      doctor,
      name,
      date: formattedDate,
      time: formattedTime
    });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const formatDate = (date) => {
    return date.toDateString();
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {/* Display the selected doctor's image and details */}
      <View style={styles.doctorInfo}>
        <Image source={doctor.image} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
      </View>

      <Text style={styles.title}>Book Your Appointment</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      {/* Date Picker */}
      <TouchableOpacity
        style={styles.dateTimeButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateTimeButtonText}>
          📅 {formatDate(date)}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()} // Prevent selecting past dates
        />
      )}

      {/* Time Picker */}
      <TouchableOpacity
        style={styles.dateTimeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.dateTimeButtonText}>
          🕐 {formatTime(time)}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Confirm Appointment" onPress={handleAppointment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  doctorInfo: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#777',
    marginTop: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16
  },
  dateTimeButton: {
    height: 50,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden'
  }
});

export default AppointmentPage;