import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'DANGERRA' }} />
      <Stack.Screen name="about" 
        options={{ 
          title: 'About' 
        }} />
    </Stack>
  );
}
