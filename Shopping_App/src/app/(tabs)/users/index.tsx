import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import {
  getUsers,
  deleteUser,
  updateUserPartial,
  User,
} from '@/services/userService';
import { useUserContext } from '@/context/UserContext';

export default function UsersScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { newlyCreatedUser, setNewlyCreatedUser } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteConfirmUserId, setDeleteConfirmUserId] = useState<number | null>(null);
  const [deleteConfirmUserName, setDeleteConfirmUserName] = useState('');
  const [userJustAdded, setUserJustAdded] = useState(false);

  // ✅ GET - Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      console.log('Users fetched:', data.length);
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load users on component mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [fetchUsers]);

  // Refresh users when returning from add screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Don't refresh if we just added a user via context
      if (!userJustAdded) {
        fetchUsers();
      } else {
        // Reset the flag after the first focus
        setUserJustAdded(false);
      }
    });

    return unsubscribe;
  }, [navigation, fetchUsers, userJustAdded]);

  // Handle newly created user from add screen
  useEffect(() => {
    if (newlyCreatedUser) {
      // Check if this user already exists in the list
      const userExists = users.some((u) => u.id === newlyCreatedUser.id);
      if (!userExists) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUsers((prevUsers) => [newlyCreatedUser, ...prevUsers]);
        // Flag that we just added a user so focus listener doesn't overwrite it
        setUserJustAdded(true);
      }
      // Clear the newly created user from context
      setNewlyCreatedUser(null);
    }
  }, [newlyCreatedUser, setNewlyCreatedUser]);

  // ✅ DELETE - Remove user
  const handleDeleteUser = useCallback((userId: number, userName: string) => {
    setDeleteConfirmUserId(userId);
    setDeleteConfirmUserName(userName);
    setDeleteConfirmVisible(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (deleteConfirmUserId === null) return;

    try {
      setActionLoading(deleteConfirmUserId);
      console.log('Calling deleteUser API for:', deleteConfirmUserId);
      await deleteUser(deleteConfirmUserId);
      console.log('Delete successful');
      setUsers((prevUsers) => {
        const updated = prevUsers.filter((user) => user.id !== deleteConfirmUserId);
        console.log('Users after delete:', updated.length);
        return updated;
      });
      Alert.alert('Success', 'User deleted successfully!');
      setDeleteConfirmVisible(false);
    } catch (err) {
      console.error('Delete error:', err);
      Alert.alert('Error', 'Failed to delete user. Please try again.');
    } finally {
      setActionLoading(null);
    }
  }, [deleteConfirmUserId]);

  // ✅ PATCH - Update user email
  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
    setEditEmail(user.email);
    setEditModalVisible(true);
  }, []);

  const handleSaveEmail = useCallback(async () => {
    if (!editingUser || !editEmail || editEmail === editingUser.email) {
      setEditModalVisible(false);
      return;
    }

    try {
      setActionLoading(editingUser.id);
      const updatedUser = await updateUserPartial(editingUser.id, { email: editEmail });
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editingUser.id ? updatedUser : u))
      );
      Alert.alert('Success', 'User email updated!');
      setEditModalVisible(false);
    } catch (err) {
      Alert.alert('Error', 'Failed to update user. Please try again.');
      console.error('Error updating user:', err);
    } finally {
      setActionLoading(null);
    }
  }, [editingUser, editEmail]);

  const handleAddUser = useCallback(() => {
    router.push('/(tabs)/users/add');
  }, [router]);

  const renderUserCard = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.detailsContainer}>
          <Ionicons name="call" size={12} color={CoveColors.textSecondary} />
          <Text style={styles.detail}>{item.phone}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons name="globe" size={12} color={CoveColors.textSecondary} />
          <Text style={styles.detail}>{item.website}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <Pressable
          style={styles.iconButton}
          onPress={() => handleEditUser(item)}
          disabled={actionLoading === item.id}
        >
          {actionLoading === item.id ? (
            <ActivityIndicator size="small" color={CoveColors.primary} />
          ) : (
            <Ionicons name="pencil" size={18} color={CoveColors.primary} />
          )}
        </Pressable>
        <Pressable
          style={[styles.iconButton, styles.deleteButton]}
          onPress={() => handleDeleteUser(item.id, item.name)}
          disabled={actionLoading === item.id}
        >
          {actionLoading === item.id ? (
            <ActivityIndicator size="small" color="#FF6B6B" />
          ) : (
            <Ionicons name="trash" size={18} color="#FF6B6B" />
          )}
        </Pressable>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={CoveColors.primary} />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle" size={64} color={CoveColors.textSecondary} />
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={fetchUsers}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserCard}
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.title}>Users</Text>
                <Text style={styles.subtitle}>{users.length} users</Text>
              </View>
              <Pressable style={styles.addButton} onPress={handleAddUser}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Edit Email Modal */}
        <Modal
          animationType="none"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
          presentationStyle="overFullScreen"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update Email</Text>
              {editingUser && (
                <Text style={styles.modalSubtitle}>User: {editingUser.name}</Text>
              )}
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new email"
                placeholderTextColor={CoveColors.textMuted}
                value={editEmail}
                onChangeText={setEditEmail}
                keyboardType="email-address"
                editable={actionLoading === null}
              />
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setEditModalVisible(false)}
                  disabled={actionLoading !== null}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveEmail}
                  disabled={actionLoading !== null}
                >
                  {actionLoading !== null ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          animationType="none"
          transparent={true}
          visible={deleteConfirmVisible}
          onRequestClose={() => setDeleteConfirmVisible(false)}
          presentationStyle="overFullScreen"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete User</Text>
              <Text style={styles.modalSubtitle}>
                Are you sure you want to delete {deleteConfirmUserName}?
              </Text>
              <Text style={styles.deleteWarning}>This action cannot be undone.</Text>
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setDeleteConfirmVisible(false)}
                  disabled={actionLoading !== null}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.deleteConfirmButton]}
                  onPress={handleConfirmDelete}
                  disabled={actionLoading !== null}
                >
                  {actionLoading !== null ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.deleteConfirmButtonText}>Delete</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    marginTop: 4,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CoveColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: CoveColors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: CoveColors.border,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: CoveColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    gap: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  userEmail: {
    fontSize: 13,
    color: CoveColors.textSecondary,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detail: {
    fontSize: 12,
    color: CoveColors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: CoveColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CoveColors.border,
  },
  deleteButton: {
    backgroundColor: '#FFE0E0',
    borderColor: '#FF6B6B',
  },
  loadingText: {
    fontSize: 16,
    color: CoveColors.textPrimary,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  errorMessage: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: CoveColors.card,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    gap: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  modalSubtitle: {
    fontSize: 14,
    color: CoveColors.textSecondary,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: CoveColors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: CoveColors.textPrimary,
    backgroundColor: CoveColors.background,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
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
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  saveButton: {
    backgroundColor: CoveColors.primary,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteWarning: {
    fontSize: 12,
    color: '#FF6B6B',
    fontStyle: 'italic',
  },
  deleteConfirmButton: {
    backgroundColor: '#FF6B6B',
  },
  deleteConfirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
