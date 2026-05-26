import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CoveColors } from '@/constants/theme';
import { useAuth } from '@/context';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const passwordRef = useRef<TextInput>(null);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      await signIn(email, password);
      router.replace('/(tabs)/shop');
    } catch (error) {
      Alert.alert('Sign In Failed', 'Please check your credentials and try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>C</Text>
          </View>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to pick up where you left off.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="hannah@example.com"
              placeholderTextColor={CoveColors.textMuted}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              editable={!isLoading}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>PASSWORD</Text>
              <Pressable onPress={() => {}}>
                <Text style={styles.forgotLink}>Forgot?</Text>
              </Pressable>
            </View>
            <View style={[styles.input, styles.passwordContainer, errors.password && styles.inputError]}>
              <TextInput
                ref={passwordRef}
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor={CoveColors.textMuted}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                secureTextEntry={!isPasswordVisible}
                returnKeyType="done"
                onSubmitEditing={handleSignIn}
                editable={!isLoading}
              />
              <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={CoveColors.textSecondary}
                />
              </Pressable>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <Pressable
            style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signInButtonText}>Sign in</Text>
            )}
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialContainer}>
            <Pressable style={styles.socialButton} onPress={() => {}}>
              <View style={styles.socialButtonContent}>
                <Ionicons name="logo-apple" size={20} color={CoveColors.textPrimary} />
                <Text style={styles.socialButtonText}>Apple</Text>
              </View>
            </Pressable>
            <Pressable style={styles.socialButton} onPress={() => {}}>
              <View style={styles.socialButtonContent}>
                <Ionicons name="logo-google" size={20} color={CoveColors.textPrimary} />
                <Text style={styles.socialButtonText}>Google</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to Cove?</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.createAccountLink}>Create account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: CoveColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: CoveColors.textPrimary,
    textTransform: 'uppercase',
  },
  forgotLink: {
    fontSize: 12,
    color: CoveColors.primary,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: CoveColors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: CoveColors.textPrimary,
    backgroundColor: CoveColors.card,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: CoveColors.textPrimary,
  },
  inputError: {
    borderColor: '#FF4444',
  },
  errorText: {
    fontSize: 12,
    color: '#FF4444',
    marginTop: 4,
  },
  signInButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
    minHeight: 50,
    justifyContent: 'center',
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: CoveColors.border,
  },
  dividerText: {
    fontSize: 12,
    color: CoveColors.textSecondary,
    fontWeight: '500',
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: CoveColors.border,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: CoveColors.card,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: CoveColors.textPrimary,
  },
  footer: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    color: CoveColors.textSecondary,
  },
  createAccountLink: {
    fontSize: 14,
    color: CoveColors.primary,
    fontWeight: '600',
  },
});
