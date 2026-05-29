import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { createUser } from '@/services/userService';
import { useUserContext } from '@/context/UserContext';

export default function AddUserScreen() {
  const router = useRouter();
  const { setNewlyCreatedUser } = useUserContext();
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserWebsite, setNewUserWebsite] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = useCallback(async () => {
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPhone.trim() || !newUserWebsite.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const newUser = await createUser({
        name: newUserName,
        email: newUserEmail,
        phone: newUserPhone,
        username: newUserName.toLowerCase().replace(/\s/g, ''),
        website: newUserWebsite,
      });
      setIsLoading(false);

      // Store the newly created user in context for display
      setNewlyCreatedUser(newUser);

      // Clear form fields
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
      setNewUserWebsite('');

      // Navigate back to users list - context listener will add the user to the list
      // Use setTimeout to ensure context is updated before navigation
      setTimeout(() => {
        router.back();
      }, 100);
    } catch (err) {
      console.error('Error creating user:', err);
      setIsLoading(false);
      setTimeout(() => {
        Alert.alert('Error', 'Failed to create user. Please try again.');
      }, 100);
    }
  }, [newUserName, newUserEmail, newUserPhone, newUserWebsite, router, setNewlyCreatedUser]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleCancel} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={CoveColors.textPrimary} />
          </Pressable>
          <Text style={styles.title}>Add New User</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter user name"
              placeholderTextColor={CoveColors.textMuted}
              value={newUserName}
              onChangeText={setNewUserName}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor={CoveColors.textMuted}
              value={newUserEmail}
              onChangeText={setNewUserEmail}
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor={CoveColors.textMuted}
              value={newUserPhone}
              onChangeText={setNewUserPhone}
              keyboardType="phone-pad"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter website"
              placeholderTextColor={CoveColors.textMuted}
              value={newUserWebsite}
              onChangeText={setNewUserWebsite}
              keyboardType="url"
              editable={!isLoading}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.createButton]}
            onPress={handleCreateUser}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.createButtonText}>Create User</Text>
            )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: CoveColors.border,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 44,
  },
  formContainer: {
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: CoveColors.background,
    borderWidth: 1,
    borderColor: CoveColors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  createButton: {
    backgroundColor: CoveColors.primary,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
