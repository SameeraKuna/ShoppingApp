import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, useCallback } from 'react-native';
import { CoveColors } from '@/constants/theme';
import { useWishlist } from '@/context';
import { useAppSelector } from '@/redux/hooks';
import { selectCartTotalCount } from '@/redux/cart/selectors';

export default function TabsLayout() {
  const cartCount = useAppSelector(selectCartTotalCount);
  const { items: wishlistItems } = useWishlist();

  const CartTabIcon = useCallback(({ color, size }: { color: string; size: number }) => (
    <View>
      <Ionicons name="bag" color={color} size={size} />
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
        </View>
      )}
    </View>
  ), [cartCount]);

  const WishlistTabIcon = useCallback(({ color, size }: { color: string; size: number }) => (
    <View>
      <Ionicons name="heart" color={color} size={size} />
      {wishlistItems.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{wishlistItems.length > 99 ? '99+' : wishlistItems.length}</Text>
        </View>
      )}
    </View>
  ), [wishlistItems.length]);

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
    minWidth: 18,
    height: 18,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
