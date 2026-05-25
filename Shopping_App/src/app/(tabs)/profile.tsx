import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { MenuRow } from '@/components/menu-row';
import { useAuth, useWishlist } from '@/context';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleSignOut = () => {
    signOut();
    router.replace('/sign-in');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Not signed in</Text>
        </View>
      </SafeAreaView>
    );
  }

  const userInitials = getInitials(user.name);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userInitials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name.toUpperCase()}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <View style={styles.badgeContainer}>
              <Ionicons name="star" size={12} color={CoveColors.primary} />
              <Text style={styles.badge}>COVE MEMBER</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={CoveColors.textSecondary} />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{wishlistItems.length}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuRow
            icon="list"
            title="My Orders"
            subtitle="3 active · 12 past"
            showChevron
          />
          <MenuRow
            icon="heart"
            title="Wishlist"
            subtitle="8 saved items"
            showChevron
          />
          <MenuRow
            icon="location"
            title="Addresses"
            subtitle="2 saved · Home default"
            showChevron
          />
          <MenuRow
            icon="card"
            title="Payment methods"
            subtitle="•••• 4421 · default"
            showChevron
          />
          <MenuRow
            icon="alert-circle"
            title="Report damage"
            subtitle="Send photos of an issue"
            onPress={() => router.push('/report-damage')}
            showChevron
          />
          <MenuRow
            icon="refresh"
            title="Returns"
            subtitle="Start a return"
            showChevron
          />
          <MenuRow
            icon="notifications"
            title="Notifications"
            subtitle="Push, email & SMS"
            showChevron
          />
        </View>

        {/* Sign Out Button */}
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out" size={18} color={CoveColors.primary} />
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: CoveColors.textSecondary,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CoveColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  email: {
    fontSize: 12,
    color: CoveColors.textSecondary,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badge: {
    fontSize: 10,
    color: CoveColors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: CoveColors.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: CoveColors.textSecondary,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 12,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.primary,
  },
});
