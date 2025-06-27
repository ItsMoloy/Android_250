import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DoctorCard = ({ doctor, selected, onSelect, renderStars }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onSelect(doctor)}
      style={[
        styles.card,
        selected ? styles.cardSelected : styles.cardUnselected,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={doctor.image} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.nameText}>{doctor.name.split(' ')[1]}</Text>
      <Text style={styles.specialtyText}>{doctor.specialty}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.stars}>{renderStars(doctor.rating)}</Text>
        <Text style={styles.ratingNumber}>{doctor.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
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
    borderWidth: 3,
    borderColor: '#667eea',
    shadowOpacity: 0.3,
    elevation: 12,
  },
  cardUnselected: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#a78bfa', 
    backgroundColor: '#e0d7fc',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  specialtyText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingNumber: {
    fontSize: 13,
    color: '#999',
  },
});

export default DoctorCard;
