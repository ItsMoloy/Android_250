import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';

const AdminDashboard = ({ navigation }) => {
  // Sample data - in a real app, this would come from your backend
  const [doctors, setDoctors] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      patientsToday: 5,
      appointments: [
        { id: '1', patientName: 'John Doe', time: '09:00 AM', status: 'Completed' },
        { id: '2', patientName: 'Sarah Smith', time: '09:30 AM', status: 'In Progress' },
        { id: '3', patientName: 'Mike Johnson', time: '10:00 AM', status: 'Waiting' },
      ]
    },
    {
      id: '2',
      name: 'Dr. Robert Chen',
      specialty: 'Neurology',
      patientsToday: 3,
      appointments: [
        { id: '4', patientName: 'Emma Williams', time: '09:15 AM', status: 'Completed' },
        { id: '5', patientName: 'Robert Brown', time: '10:15 AM', status: 'Waiting' },
        { id: '6', patientName: 'Linda Davis', time: '11:00 AM', status: 'Waiting' },
      ]
    },
    {
      id: '3',
      name: 'Dr. Lisa Wong',
      specialty: 'Pediatrics',
      patientsToday: 4,
      appointments: [
        { id: '7', patientName: 'Charlie Wilson', time: '10:30 AM', status: 'Waiting' },
        { id: '8', patientName: 'Alice Taylor', time: '11:30 AM', status: 'Waiting' },
      ]
    },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDoctorData, setNewDoctorData] = useState({
    name: '',
    specialty: '',
  });

  const totalPatients = doctors.reduce((total, doctor) => total + doctor.patientsToday, 0);
  const totalCompleted = doctors.reduce((total, doctor) =>
    total + doctor.appointments.filter(a => a.status === 'Completed').length, 0);

  const viewDoctorAppointments = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalVisible(true);
  };

  const renderDoctorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.doctorCard}
      onPress={() => viewDoctorAppointments(item)}
    >
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
      </View>

      <View style={styles.doctorStats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{item.patientsToday}</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {item.appointments.filter(a => a.status === 'Completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentPatient}>{item.patientName}</Text>
      <Text style={styles.appointmentTime}>{item.time}</Text>
      <Text style={[
        styles.appointmentStatus,
        item.status === 'Waiting' ? styles.statusWaiting :
        item.status === 'In Progress' ? styles.statusInProgress :
        styles.statusCompleted
      ]}>
        {item.status}
      </Text>
    </View>
  );

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryNumber}>{doctors.length}</Text>
              <Text style={styles.summaryLabel}>Doctors</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryNumber}>{totalPatients}</Text>
              <Text style={styles.summaryLabel}>Patients</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryNumber}>{totalCompleted}</Text>
              <Text style={styles.summaryLabel}>Completed</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Doctors List</Text>
      </View>

      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.doctorsList}
      />

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedDoctor ? selectedDoctor.name : ''} - Appointments
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>

            {selectedDoctor && (
              <FlatList
                data={selectedDoctor.appointments}
                renderItem={renderAppointmentItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                  <Text style={styles.emptyListText}>No appointments scheduled</Text>
                }
              />
            )}
          </View>
        </View>
      </Modal>
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
  summaryContainer: {
    padding: 15,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryStat: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorsList: {
    padding: 15,
  },
  doctorCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  doctorInfo: {
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  doctorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  viewButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#007bff',
    fontWeight: '500',
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appointmentPatient: {
    fontSize: 16,
    fontWeight: '500',
    flex: 2,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  appointmentStatus: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  statusWaiting: {
    color: '#f57c00',
  },
  statusInProgress: {
    color: '#4caf50',
  },
  statusCompleted: {
    color: '#9e9e9e',
  },
  emptyListText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
});

export default AdminDashboard;