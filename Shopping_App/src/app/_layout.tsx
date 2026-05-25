import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { CoveColors } from '@/constants/theme';
import { AppProviders } from '@/context';
import { store } from '@/redux/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ReduxProvider store={store}>
        <AppProviders>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: CoveColors.background },
            }}
          >
            <Stack.Screen name="splash" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="review" options={{ presentation: 'modal' }} />
            <Stack.Screen name="report-damage" options={{ presentation: 'modal' }} />
          </Stack>
        </AppProviders>
      </ReduxProvider>
    </ThemeProvider>
  );
}
