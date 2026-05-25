import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CoveColors } from '@/constants/theme';
import { useAuth } from '@/context';

export default function SplashScreen() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        router.replace('/(tabs)/shop');
      } else {
        router.replace('/sign-in');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, user]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>C</Text>
        </View>
      </View>
      <Text style={styles.title}>cove</Text>
      <Text style={styles.tagline}>SHOP SLOWLY, LIVE WELL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: CoveColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  tagline: {
    fontSize: 12,
    color: CoveColors.textSecondary,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
