import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [reportedCrimes, setReportedCrimes] = useState<Array<{ latitude: number; longitude: number; type: string; description: string }>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [crimeType, setCrimeType] = useState('Theft');
  const [crimeDescription, setCrimeDescription] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, []);

  const reportCrime = () => {
    if (!location) return;
    setReportedCrimes([...reportedCrimes, {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      type: crimeType,
      description: crimeDescription,
    }]);
    setModalVisible(false);
    setCrimeDescription('');
    Alert.alert('Crime Reported', 'Thank you for helping keep everyone safe!');
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            {reportedCrimes.map((crime, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: crime.latitude, longitude: crime.longitude }}
                title={crime.type}
                description={crime.description}
                pinColor="red"
              />
            ))}
          </MapView>
          <TouchableOpacity style={styles.reportButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.reportButtonText}>Report Crime Here</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Report Crime</Text>
            <Picker
                selectedValue={crimeType}
                onValueChange={(itemValue) => setCrimeType(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Theft" value="Theft" color="#000" />
                <Picker.Item label="Assault" value="Assault" color="#000" />
                <Picker.Item label="Vandalism" value="Vandalism" color="#000" />
                <Picker.Item label="Suspicious Activity" value="Suspicious Activity" color="#000" />
                <Picker.Item label="Other" value="Other" color="#000" />
            </Picker>

              <TextInput
                style={styles.textInput}
                placeholder="Describe the incident..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={crimeDescription}
                onChangeText={setCrimeDescription}
              />
              <TouchableOpacity style={styles.modalButton} onPress={reportCrime}>
                <Text style={styles.modalButtonText}>Submit Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      ) : (
        <Text style={{ color: 'white' }}>Fetching your location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131313',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  reportButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#e51513',
    padding: 15,
    borderRadius: 10,
  },
  reportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#000',
  },
  modalButton: {
    backgroundColor: '#e51513',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalCancelButton: {
    padding: 10,
  },
  modalCancelText: {
    color: '#bbb',
    textAlign: 'center',
  },
});