import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [reports, setReports] = useState<Array<{ latitude: number; longitude: number; type: string; description: string; category: string; date: string; time: string }>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('Theft');
  const [description, setDescription] = useState('');
  const [reportCategory, setReportCategory] = useState<'Crime' | 'Disaster'>('Crime');
  const [viewCategory, setViewCategory] = useState<'All' | 'Crime' | 'Disaster'>('All');

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

  const submitReport = () => {
    if (!location) return;
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];
    const time = currentDate.toTimeString().slice(0, 5);

    setReports([...reports, {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      type: selectedType,
      description,
      category: reportCategory,
      date,
      time,
    }]);
    setModalVisible(false);
    setDescription('');
    Alert.alert(`${reportCategory} Reported`, 'Thank you for your help!');
  };

  const disasterTypes = ['Flood', 'Fire', 'Earthquake', 'Storm', 'Other'];

  const filteredReports = viewCategory === 'All' ? reports : reports.filter(report => report.category === viewCategory);

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
            {filteredReports.map((report, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: report.latitude, longitude: report.longitude }}
                title={`${report.category}: ${report.type} (${report.date} ${report.time})`}
                description={report.description}
                pinColor={report.category === 'Crime' ? 'red' : 'orange'}
              />
            ))}
          </MapView>

          <View style={styles.toggleView}>
            {['All', 'Crime', 'Disaster'].map(category => (
              <TouchableOpacity
                key={category}
                style={[styles.toggleButton, viewCategory === category && styles.activeToggle]}
                onPress={() => setViewCategory(category as 'All' | 'Crime' | 'Disaster')}
              >
                <Text style={styles.toggleButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.reportButton} onPress={() => {
            setReportCategory('Crime');
            setSelectedType('Theft');
            setModalVisible(true);
          }}>
            <Text style={styles.reportButtonText}>Report Crime</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.naturalDisasterButton} onPress={() => {
            setReportCategory('Disaster');
            setSelectedType('Flood');
            setModalVisible(true);
          }}>
            <Text style={styles.naturalDisasterButtonText}>Report Disaster</Text>
          </TouchableOpacity>

          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Report {reportCategory}</Text>
              <Picker selectedValue={selectedType} onValueChange={(itemValue) => setSelectedType(itemValue)} style={styles.picker}>
                {(reportCategory === 'Crime' ? ['Theft', 'Assault', 'Vandalism', 'Suspicious Activity', 'Other'] : disasterTypes).map((type) => (
                  <Picker.Item key={type} label={type} value={type} color="#000" />
                ))}
              </Picker>
              <TextInput style={styles.textInput} placeholder="Describe the incident..." placeholderTextColor="#999" multiline numberOfLines={4} value={description} onChangeText={setDescription} />
              <TouchableOpacity style={styles.modalButton} onPress={submitReport}><Text style={styles.modalButtonText}>Submit Report</Text></TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}><Text style={styles.modalCancelText}>Cancel</Text></TouchableOpacity>
            </View>
          </Modal>
        </>
      ) : (<Text style={{ color: 'white' }}>SETTING LOCATION</Text>)}
    </View>
  );
}



const styles = StyleSheet.create({
  // Container and Map Styles
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

  // Toggle View Styles
  toggleView: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 5,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#e51513',
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // Report Buttons Styles
  reportButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#e51513',
    padding: 15,
    borderRadius: 50,
  },
  reportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  naturalDisasterButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#7f412d',
    padding: 15,
    borderRadius: 50,
  },
  naturalDisasterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Modal Styles
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