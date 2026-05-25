import { useState, useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CoveColors } from '@/constants/theme';
import { searchProducts } from '@/data/products';
import { ProductCard } from '@/components/product-card';
import { useWishlist } from '@/context';
import { useAppSelector } from '@/redux/hooks';
import { selectProducts } from '@/redux/products/productSlice';

export default function SearchScreen() {
  const router = useRouter();
  const { has: isWishlisted, toggle: toggleWishlist } = useWishlist();
  const products = useAppSelector(selectProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return searchProducts(searchQuery);
  }, [products, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.gridRow}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Search</Text>
            </View>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color={CoveColors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor={CoveColors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>
          </>
        }
        ListEmptyComponent={
          filteredProducts.length === 0 && searchQuery.trim() ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="search-outline"
                size={64}
                color={CoveColors.textSecondary}
              />
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptyMessage}>Try searching for something else</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            {...item}
            isWishlisted={isWishlisted(item.id)}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: CoveColors.card,
    borderWidth: 1,
    borderColor: CoveColors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: CoveColors.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
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
