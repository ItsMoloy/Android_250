import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    acceptedAppointments: 0,
    cancelledAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for all appointments
    const appointmentsSubscriber = firestore()
      .collection('appointments')
      .orderBy('createdAt', 'desc')
      .limit(50) // Limit to most recent 50 appointments
      .onSnapshot(querySnapshot => {
        const appointmentsList = [];
        let total = 0;
        let pending = 0;
        let accepted = 0;
        let cancelled = 0;

        querySnapshot.forEach(doc => {
          const appointment = {
            id: doc.id,
            ...doc.data()
          };

          appointmentsList.push(appointment);
          total++;

          if (appointment.status === 'pending') pending++;
          else if (appointment.status === 'accepted') accepted++;
          else if (appointment.status === 'cancelled') cancelled++;
        });

        setAppointments(appointmentsList);
        setStats({
          totalAppointments: total,
          pendingAppointments: pending,
          acceptedAppointments: accepted,
          cancelledAppointments: cancelled,
        });
        setLoading(false);
      });

    // Real-time listener for admin notifications
    const notificationsSubscriber = firestore()
      .collection('notifications')
      .where('recipientType', '==', 'admin')
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

  const renderAppointment = ({ item }) => (
    <View style={[styles.appointmentCard, getStatusStyle(item.status)]}>
      <Text style={styles.patientName}>{item.patientName}</Text>
      <Text>Doctor: {item.doctorName}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Time: {item.time}</Text>
      <Text>Status: <Text style={styles.statusText}>{item.status}</Text></Text>
    </View>
  );

  const getStatusStyle = (status) => {
    switch(status) {
      case 'accepted':
        return { borderLeftColor: '#2ecc71' };
      case 'pending':
        return { borderLeftColor: '#e67e22' };
      case 'cancelled':
        return { borderLeftColor: '#e74c3c' };
      default:
        return { borderLeftColor: '#3498db' };
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => markNotificationAsRead(item.id)}
    >
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text>{item.message}</Text>
      <Text style={styles.notificationTime}>
        {item.createdAt?.toDate?.().toLocaleString() || 'Unknown time'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.dashboardTitle}>Admin Dashboard</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalAppointments}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.pendingAppointments}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.acceptedAppointments}</Text>
          <Text style={styles.statLabel}>Accepted</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.cancelledAppointments}</Text>
          <Text style={styles.statLabel}>Cancelled</Text>
        </View>
      </View>

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

      <Text style={styles.sectionTitle}>Recent Appointments</Text>
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
        <Text style={styles.emptyText}>No appointments found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 12,
  },
  appointmentCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusText: {
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
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'right',
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

export default AdminDashboard;