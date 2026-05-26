import { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { Chip } from '@/components/chip';
import { ProductCard } from '@/components/product-card';
import { ProductCardSkeleton } from '@/components/loading-skeleton';
import { CATEGORIES } from '@/data/products';
import { useWishlist, useAuth } from '@/context';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectProducts, selectProductsLoading, selectProductsError } from '@/redux/products/productSlice';
import { selectCartTotalCount } from '@/redux/cart/selectors';
import { FETCH_PRODUCTS } from '@/redux/sagas/productSaga';

export default function ShopScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { has: isWishlisted, toggle: toggleWishlist } = useWishlist();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const productsError = useAppSelector(selectProductsError);
  const cartCount = useAppSelector(selectCartTotalCount);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch({ type: FETCH_PRODUCTS });
  }, [dispatch]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch({ type: FETCH_PRODUCTS });
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [products, searchQuery, selectedCategory]);

  const userName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'there';

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={isLoading && products.length === 0 ? Array(6).fill(null) : filteredProducts}
        keyExtractor={(item, index) => item ? item.id : `skeleton-${index}`}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.gridRow}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={CoveColors.primary} />}
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
                    <Text style={styles.cartBadgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
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
                value={inputValue}
                onChangeText={setInputValue}
              />
              {inputValue.length > 0 && (
                <Pressable onPress={handleClearSearch}>
                  <Ionicons name="close-circle" size={20} color={CoveColors.textSecondary} />
                </Pressable>
              )}
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
        renderItem={({ item }) =>
          item ? (
            <ProductCard
              id={item.id}
              name={item.name}
              price={item.price}
              category={item.category}
              rating={item.rating}
              reviewCount={item.reviewCount}
              image={item.image}
              color={item.color}
              isWishlisted={isWishlisted(item.id)}
              onPress={() => router.push(`/(tabs)/shop/${item.id}`)}
              onWishlistToggle={() => toggleWishlist(item.id)}
            />
          ) : (
            <ProductCardSkeleton />
          )
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.stateContainer}>
              {productsError ? (
                <>
                  <Ionicons name="alert-circle-outline" size={64} color={CoveColors.primary} />
                  <Text style={styles.stateTitle}>Failed to load products</Text>
                  <Text style={styles.stateMessage}>{productsError}</Text>
                  <Pressable
                    style={styles.retryButton}
                    onPress={() => dispatch({ type: FETCH_PRODUCTS })}
                  >
                    <Text style={styles.retryButtonText}>Try Again</Text>
                  </Pressable>
                </>
              ) : filteredProducts.length === 0 ? (
                <>
                  <Ionicons name="search-outline" size={64} color={CoveColors.textSecondary} />
                  <Text style={styles.stateTitle}>No products found</Text>
                  <Text style={styles.stateMessage}>
                    {selectedCategory !== 'All'
                      ? `No products in ${selectedCategory}`
                      : searchQuery.trim()
                        ? 'Try a different search term'
                        : 'Check back soon!'}
                  </Text>
                </>
              ) : null}
            </View>
          ) : null
        }
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
  stateContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
    textAlign: 'center',
  },
  stateMessage: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
