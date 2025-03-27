import { Text, View, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Dangerra</Text>
      <Text style={styles.description}>
        Stay informed, aware, and protected with Dangerra, a groundbreaking safety-tracking app developed by Nicholas Columbus. Dangerra provides real-time alerts on nearby disasters, crimes, and other dangers, empowering you to proactively navigate your environment with confidence.
      </Text>
      <Text style={styles.subtitle}>Key Features:</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• Real-time location-based alerts</Text>
        <Text style={styles.listItem}>• Interactive mapping of nearby incidents</Text>
        <Text style={styles.listItem}>• Easy reporting of crimes and dangers</Text>
        <Text style={styles.listItem}>• Customizable notifications</Text>
      </View>
      <Text style={styles.footer}>
        Dangerra ensures you and your loved ones always stay safe and informed, no matter where you are.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#131313',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e51513',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  listContainer: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  footer: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
});
