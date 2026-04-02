import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'My Notes' }} />
      <Stack.Screen name="notes" options={{ title: 'New Note' }} />
    </Stack>
  );
}
