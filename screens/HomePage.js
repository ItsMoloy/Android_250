import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Animated, {
  SlideInDown,
  SlideInUp,
  FadeIn,
  FadeOut,
  ZoomIn,
  BounceIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header';
import AppointmentButton from '../components/AppointmentButton';

const { width, height } = Dimensions.get('window');

const CARD_MARGIN = 8;
const NUM_COLUMNS = 3;
const CARD_WIDTH = (width - (CARD_MARGIN * 2 * NUM_COLUMNS)) / NUM_COLUMNS;

const doctors = [
  { id: '1', name: 'Dr. Ayesha Khan', specialty: 'Cardiologist', image: require('../assets/doctor1.jpeg'), rating: 4.9, experience: '15 years' },
  { id: '2', name: 'Dr. Rahul Sen', specialty: 'Neurologist', image: require('../assets/doctor2.jpeg'), rating: 4.8, experience: '12 years' },
  { id: '3', name: 'Dr. Tanvir Ahmed', specialty: 'Orthopedic', image: require('../assets/doctor3.jpeg'), rating: 4.7, experience: '18 years' },
  { id: '4', name: 'Dr. Tasnova Tarannum', specialty: 'Gastroenterologist', image: require('../assets/doctor4.jpeg'), rating: 4.9, experience: '14 years' },
  { id: '5', name: 'Dr. Nakib Hasan', specialty: 'Pediatrician', image: require('../assets/doctor5.jpeg'), rating: 4.8, experience: '10 years' },
  { id: '6', name: 'Dr. Shakib Khan', specialty: 'Psychiatrist', image: require('../assets/doctor6.jpeg'), rating: 4.6, experience: '16 years' },
];



const DoctorCard = ({ doctor, selected, onSelect, renderStars }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, selected && styles.cardSelected]}
      onPress={() => onSelect(doctor)}
    >
      <View style={styles.imageContainer}>
        <Image source={doctor.image} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.name}>{doctor.name.split(' ')[1]}</Text>
      <Text style={styles.specialty}>{doctor.specialty}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.stars}>{renderStars(doctor.rating)}</Text>
        <Text style={styles.ratingNumber}>{doctor.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomePage = ({ navigation }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleAppointment = () => {
    if (selectedDoctor) {
      navigation.navigate('Appointment', { doctor: selectedDoctor });
    } else {
      alert('Please select a doctor first!');
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let stars = '⭐'.repeat(fullStars);
    if (halfStar) stars += '⭐';
    return stars;
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <Animated.View entering={SlideInDown.delay(200)} style={styles.headerSection}>
          <LinearGradient
            colors={['#667eea', '#764ba2', '#f093fb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <Header />
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />
          </LinearGradient>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View entering={SlideInUp.delay(600)} style={styles.statsContainer}>
          {[
            { label: 'Doctors', value: '50+' },
            { label: 'Patients', value: '1000+' },
            { label: 'Support', value: '24/7' },
          ].map((item, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctor by name..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Doctors Section Header */}
        <Animated.View entering={FadeIn.delay(900)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>✨ Our Top Specialists</Text>
          <Text style={styles.sectionSubtitle}>Choose from our expert medical professionals</Text>
        </Animated.View>

        {/* Doctors Grid */}
        <Animated.View entering={ZoomIn.delay(1100)}>
          <FlatList
            data={filteredDoctors}
            numColumns={NUM_COLUMNS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
            ListEmptyComponent={() => (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 16 }}>No doctors found.</Text>
              </View>
            )}
            renderItem={({ item, index }) => (
              <Animated.View entering={BounceIn.delay(1200 + index * 100)}>
                <DoctorCard
                  doctor={item}
                  selected={selectedDoctor?.id === item.id}
                  onSelect={handleDoctorSelect}
                  renderStars={renderStars}
                />
              </Animated.View>
            )}
          />
        </Animated.View>

        {/* Selected Doctor Preview */}
        {selectedDoctor && (
          <Animated.View entering={SlideInUp} exiting={FadeOut} style={styles.selectedDoctorPreview}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.previewGradient}
            >
              <View style={styles.previewContent}>
                <Text style={styles.previewName}>{selectedDoctor.name}</Text>
                <Text style={styles.previewSpecialty}>{selectedDoctor.specialty}</Text>
                <Text style={styles.previewRating}>
                  {renderStars(selectedDoctor.rating)} {selectedDoctor.rating} • {selectedDoctor.experience}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Appointment Button */}
        <Animated.View entering={SlideInUp.delay(1600)}>
          <AppointmentButton
            onPress={handleAppointment}
            selectedDoctor={selectedDoctor}
          />
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  headerSection: {
    marginBottom: 20,
  },
  headerGradient: {
    height: height * 0.25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    top: 20,
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: -30,
    left: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  circle3: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: -30,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    minWidth: 90,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    minHeight: 180,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#667eea',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#b36bcf',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  specialty: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: 14,
  },
  ratingNumber: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  selectedDoctorPreview: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  previewGradient: {
    padding: 15,
  },
  previewContent: {
    alignItems: 'center',
  },
  previewName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  previewSpecialty: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginVertical: 2,
  },
  previewRating: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default HomePage;
