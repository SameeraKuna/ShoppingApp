import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { StarRating } from './star-rating';

interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  image?: string;
  onPress?: () => void;
  onWishlistToggle?: () => void;
  isWishlisted?: boolean;
  color?: string;
}

export function ProductCard({
  id,
  name,
  price,
  category,
  rating,
  reviewCount,
  image,
  onPress,
  onWishlistToggle,
  isWishlisted = false,
  color = 'tan',
}: ProductCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* Product image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image || 'https://images.unsplash.com/photo-1599122235394-6eda51edd3c9?w=400&h=400&fit=crop',
          }}
          style={styles.image}
          contentFit="cover"
          cachePolicy="memory-disk"
        />
        <Pressable
          style={[
            styles.badge,
            { position: 'absolute', top: 8, right: 8, backgroundColor: CoveColors.primary },
          ]}
          onPress={(e) => {
            e.stopPropagation();
            onWishlistToggle?.();
          }}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={14}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      {/* Product info */}
      <View style={styles.info}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceRating}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <StarRating rating={Math.round(rating)} size="small" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 16,
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
    backgroundColor: '#E8E8E8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    gap: 4,
  },
  category: {
    fontSize: 12,
    color: CoveColors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  priceRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
});
