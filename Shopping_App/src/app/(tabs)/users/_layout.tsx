import { Stack } from 'expo-router';

export default function UsersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Users' }} />
      <Stack.Screen name="add" options={{ title: 'Add User' }} />
    </Stack>
  );
}
