import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorId = auth().currentUser.uid;

    // Real-time listener for appointments
    const appointmentsSubscriber = firestore()
      .collection('appointments')
      .where('doctorId', '==', doctorId)
      .orderBy('date', 'asc')
      .orderBy('time', 'asc')
      .onSnapshot(querySnapshot => {
        const appointmentsList = [];
        querySnapshot.forEach(doc => {
          appointmentsList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setAppointments(appointmentsList);
        setLoading(false);
      });

    // Real-time listener for notifications
    const notificationsSubscriber = firestore()
      .collection('notifications')
      .where('recipientId', '==', doctorId)
      .where('recipientType', '==', 'doctor')
      .where('read', '==', false)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const notificationsList = [];
        querySnapshot.forEach(doc => {
          notificationsList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setNotifications(notificationsList);
      });

    // Cleanup function
    return () => {
      appointmentsSubscriber();
      notificationsSubscriber();
    };
  }, []);

  const markNotificationAsRead = async (notificationId) => {
    await firestore()
      .collection('notifications')
      .doc(notificationId)
      .update({
        read: true
      });
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    await firestore()
      .collection('appointments')
      .doc(appointmentId)
      .update({
        status: newStatus,
        updatedAt: new Date()
      });
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.patientName}>{item.patientName}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Time: {item.time}</Text>
      <Text>Status: <Text style={styles.status}>{item.status}</Text></Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => updateAppointmentStatus(item.id, 'accepted')}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.rescheduleButton]}
          onPress={() => updateAppointmentStatus(item.id, 'reschedule')}
        >
          <Text style={styles.buttonText}>Reschedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => markNotificationAsRead(item.id)}
    >
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>New Notifications ({notifications.length})</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          style={styles.notificationsList}
        />
      ) : (
        <Text style={styles.emptyText}>No new notifications</Text>
      )}

      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {loading ? (
        <Text>Loading appointments...</Text>
      ) : appointments.length > 0 ? (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={item => item.id}
          style={styles.appointmentsList}
        />
      ) : (
        <Text style={styles.emptyText}>No appointments scheduled</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  appointmentCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  status: {
    fontWeight: 'bold',
    color: '#e67e22',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#2ecc71',
  },
  rescheduleButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notificationItem: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    marginVertical: 20,
  },
  notificationsList: {
    maxHeight: 150,
  },
  appointmentsList: {
    flex: 1,
  },
});

export default DoctorDashboard;