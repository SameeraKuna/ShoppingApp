import { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { Chip } from '@/components/chip';
import { ProductCard } from '@/components/product-card';
import { CATEGORIES, searchProducts } from '@/data/products';
import { useWishlist, useAuth } from '@/context';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectProducts } from '@/redux/products/productSlice';
import { selectCartTotalCount } from '@/redux/cart/selectors';
import { FETCH_PRODUCTS } from '@/redux/sagas/productSaga';

export default function ShopScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { has: isWishlisted, toggle: toggleWishlist } = useWishlist();
  const products = useAppSelector(selectProducts);
  const cartCount = useAppSelector(selectCartTotalCount);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch({ type: FETCH_PRODUCTS });
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery);
    }

    return filtered;
  }, [products, searchQuery]);

  const userName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'Hannah';

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
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Hi {userName},</Text>
                <Text style={styles.title}>Discover</Text>
              </View>
              <Pressable
                onPress={() => router.push('/(tabs)/cart')}
                style={styles.bagButton}
              >
                <Ionicons name="bag" size={24} color={CoveColors.primary} />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </Pressable>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color={CoveColors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor={CoveColors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
              <FlatList
                data={CATEGORIES}
                keyExtractor={(cat) => cat}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
                renderItem={({ item: cat }) => (
                  <Chip
                    label={cat}
                    selected={selectedCategory === cat}
                    onPress={() => setSelectedCategory(cat)}
                    variant="default"
                  />
                )}
              />
            </View>

            {/* Spring Edit Banner */}
            <Pressable
              style={styles.banner}
              onPress={() => router.push('/(tabs)/search')}
            >
              <Text style={styles.bannerLabel}>SPRING EDIT</Text>
              <Text style={styles.bannerText}>Up to 30% off</Text>
              <Text style={styles.bannerSubtext}>handpicked finds</Text>
              <View style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Shop now ↗</Text>
              </View>
            </Pressable>

            {/* Trending Now */}
            <View style={styles.trendingHeader}>
              <Text style={styles.trendingTitle}>Trending now</Text>
              <Pressable onPress={() => router.push('/(tabs)/search')}>
                <Text style={styles.seeAllLink}>See all</Text>
              </Pressable>
            </View>
          </>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  bagButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: CoveColors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  greeting: {
    fontSize: 14,
    color: CoveColors.textSecondary,
  },
  title: {
    fontSize: 32,
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
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  banner: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
  },
  bannerLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  seeAllLink: {
    fontSize: 13,
    color: CoveColors.primary,
    fontWeight: '600',
  },
  gridContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
});
