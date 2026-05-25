import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { CoveColors } from '@/constants/theme';
import { useWishlist } from '@/context';
import { useAppSelector } from '@/redux/hooks';
import { selectCartTotalCount } from '@/redux/cart/selectors';

export default function TabsLayout() {
  const cartCount = useAppSelector(selectCartTotalCount);
  const { items: wishlistItems } = useWishlist();

  const CartTabIcon = ({ color, size }) => (
    <View>
      <Ionicons name="bag" color={color} size={size} />
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </View>
  );

  const WishlistTabIcon = ({ color, size }) => (
    <View>
      <Ionicons name="heart" color={color} size={size} />
      {wishlistItems.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{wishlistItems.length}</Text>
        </View>
      )}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: CoveColors.primary,
        tabBarInactiveTintColor: CoveColors.textSecondary,
        tabBarStyle: {
          backgroundColor: CoveColors.card,
          borderTopColor: CoveColors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: CartTabIcon,
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: WishlistTabIcon,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: CoveColors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
