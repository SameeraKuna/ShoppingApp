import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product-card';
import { useWishlist } from '@/context';

export default function WishlistScreen() {
  const router = useRouter();
  const { items: wishlistItems, toggle: toggleWishlist } = useWishlist();

  const wishedProducts = PRODUCTS.filter((p) => wishlistItems.includes(p.id));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={wishedProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.gridRow}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Wishlist</Text>
            <Text style={styles.count}>
              {wishedProducts.length} {wishedProducts.length === 1 ? 'item' : 'items'}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color={CoveColors.textSecondary} />
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptyMessage}>Save your favorite products here</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            {...item}
            isWishlisted={true}
            onPress={() => router.push(`/(tabs)/shop/${item.id}`)}
            onWishlistToggle={() => toggleWishlist(item.id)}
          />
        )}
        contentContainerStyle={styles.gridContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  count: {
    fontSize: 13,
    color: CoveColors.textSecondary,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  emptyMessage: {
    fontSize: 14,
    color: CoveColors.textSecondary,
  },
  gridContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
});
