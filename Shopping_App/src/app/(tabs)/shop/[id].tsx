import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { PRODUCT_DETAILS, PRODUCTS } from '@/data/products';
import { StarRating } from '@/components/star-rating';
import { Chip } from '@/components/chip';
import { useWishlist } from '@/context';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/cart/actions';

export default function ProductDetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = id ? PRODUCT_DETAILS[id] : null;
  const productInfo = id ? PRODUCTS.find((p) => p.id === id) : null;
  const { has: isWishlisted, toggle: toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.label || 'Oat'
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.label || '50×60');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product || !productInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={CoveColors.primary} />
          <Text style={styles.errorTitle}>Product Not Found</Text>
          <Text style={styles.errorMessage}>
            This product might have been removed or is no longer available.
          </Text>
          <Pressable
            style={styles.errorButton}
            onPress={() => router.back()}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch(addToCart(productInfo.id, product.name, product.price, selectedColor, selectedSize, productInfo.image));
      Alert.alert('Success', 'Product added to your cart!');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={CoveColors.textPrimary} />
          </Pressable>
          <Pressable>
            <Ionicons name="share-social" size={20} color={CoveColors.primary} />
          </Pressable>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: productInfo?.image || 'https://images.unsplash.com/photo-1599122235394-6eda51edd3c9?w=400&h=400&fit=crop',
            }}
            style={styles.productImage}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
        </View>

        {/* Breadcrumb */}
        <Text style={styles.breadcrumb}>{product.breadcrumb}</Text>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <View style={styles.titleSection}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <Pressable
              style={styles.heartButton}
              onPress={() => toggleWishlist(productInfo.id)}
            >
              <Ionicons
                name={isWishlisted(productInfo.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={CoveColors.primary}
              />
            </Pressable>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <StarRating rating={product.rating} count={product.reviewCount} size="small" />
          </View>

          {/* Colors */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorGrid}>
              {product.colors.map((color) => (
                <Pressable
                  key={color.value}
                  style={[
                    styles.colorSwatch,
                    selectedColor === color.label && styles.colorSwatchSelected,
                  ]}
                  onPress={() => setSelectedColor(color.label)}
                >
                  <View style={[styles.swatch, { backgroundColor: color.value }]} />
                  {selectedColor === color.label && (
                    <Ionicons name="checkmark-circle" size={20} color={CoveColors.primary} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Sizes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeGrid}>
              {product.sizes.map((size) => (
                <Chip
                  key={size.value}
                  label={size.label}
                  selected={selectedSize === size.label}
                  onPress={() => setSelectedSize(size.label)}
                  variant="outline"
                />
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliveryInfo}>
            <Ionicons name="checkmark-circle-outline" size={20} color={CoveColors.primary} />
            <View style={styles.deliveryText}>
              <Text style={styles.deliveryTitle}>Free delivery</Text>
              <Text style={styles.deliverySubtext}>On all orders</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Add to Bag Button */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.addButton, isAddingToCart && styles.addButtonDisabled]}
          onPress={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.addButtonText}>Add to bag — ${product.price.toFixed(2)}</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoveColors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: CoveColors.textPrimary,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  imageContainer: {
    aspectRatio: 1,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E8E8E8',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  breadcrumb: {
    paddingHorizontal: 20,
    fontSize: 11,
    color: CoveColors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  titleSection: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  heartButton: {
    padding: 8,
    marginRight: -8,
  },
  ratingContainer: {
    marginTop: 4,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
    textTransform: 'uppercase',
  },
  colorGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSwatchSelected: {
    borderColor: CoveColors.primary,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  sizeGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 14,
    color: CoveColors.textSecondary,
    lineHeight: 20,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: CoveColors.border,
  },
  deliveryText: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  deliverySubtext: {
    fontSize: 12,
    color: CoveColors.textSecondary,
    marginTop: 2,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: CoveColors.border,
    backgroundColor: CoveColors.card,
  },
  addButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    minHeight: 50,
    justifyContent: 'center',
  },
  addButtonDisabled: {
    opacity: 0.7,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
