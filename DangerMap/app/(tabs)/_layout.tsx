import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor:"green",
        }}
    >
      <Tabs.Screen name="index" 
        options={{
          headerTitle: 'DANGERRA',
        }} />
      <Tabs.Screen name="about" 
        options={{ 
          title: 'About' 
        }} />
        <Tabs.Screen name="not-found" 
        options={{ 
          
        }} />
    </Tabs>
  );
}
