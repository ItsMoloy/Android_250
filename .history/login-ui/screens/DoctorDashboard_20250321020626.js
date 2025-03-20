import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const DoctorDashboard = ({ navigation }) => {
  
  const [appointments, setAppointments] = useState([
    { id: '1', patientName: 'John Doe', time: '09:00 AM', date: '2025-03-21', status: 'Waiting' },
    { id: '2', patientName: 'Sarah Smith', time: '09:30 AM', date: '2025-03-21', status: 'Waiting' },
    { id: '3', patientName: 'Mike Johnson', time: '10:00 AM', date: '2025-03-21', status: 'Waiting' },
    { id: '4', patientName: 'Emma Williams', time: '10:30 AM', date: '2025-03-21', status: 'Waiting' },
    { id: '5', patientName: 'Robert Brown', time: '11:00 AM', date: '2025-03-21', status: 'Waiting' },
  ]);

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(
      appointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentInfo}>
        <Text style={styles.patientName}>{item.patientName}</Text>
        <Text style={styles.appointmentTime}>{item.time} - {item.date}</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={[
          styles.statusText,
          item.status === 'Waiting' ? styles.waitingStatus :
          item.status === 'In Progress' ? styles.inProgressStatus :
          styles.completedStatus
        ]}>
          {item.status}
        </Text>

        <View style={styles.actionButtons}>
          {item.status === 'Waiting' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.startButton]}
              onPress={() => updateAppointmentStatus(item.id, 'In Progress')}
            >
              <Text style={styles.actionButtonText}>Start</Text>
            </TouchableOpacity>
          )}

          {item.status === 'In Progress' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.completeButton]}
              onPress={() => updateAppointmentStatus(item.id, 'Completed')}
            >
              <Text style={styles.actionButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctor Dashboard</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{appointments.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {appointments.filter(a => a.status === 'Waiting').length}
          </Text>
          <Text style={styles.statLabel}>Waiting</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {appointments.filter(a => a.status === 'In Progress').length}
          </Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {appointments.filter(a => a.status === 'Completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Today's Appointments</Text>
        <Text style={styles.listSubtitle}>Patient queue</Text>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.appointmentList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#007bff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  listHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  appointmentList: {
    padding: 15,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentInfo: {
    flex: 2,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statusContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusText: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 5,
  },
  waitingStatus: {
    color: '#f57c00',
  },
  inProgressStatus: {
    color: '#4caf50',
  },
  completedStatus: {
    color: '#9e9e9e',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: '#4caf50',
  },
  completeButton: {
    backgroundColor: '#9e9e9e',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
});

export default DoctorDashboard;