import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCartItems, selectCartTotalPrice } from '@/redux/cart/selectors';
import { removeFromCart, updateCartQuantity } from '@/redux/cart/actions';
import { CartItem } from '@/redux/cart/types';

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const handleCheckout = () => {
    Alert.alert('Coming Soon', 'Checkout functionality will be available soon!');
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemDetails}>
        <View style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.itemMeta}>
            {item.color && (
              <Text style={styles.itemMetaText}>
                Color: <Text style={{ fontWeight: '600' }}>{item.color}</Text>
              </Text>
            )}
            {item.size && (
              <Text style={styles.itemMetaText}>
                Size: <Text style={{ fontWeight: '600' }}>{item.size}</Text>
              </Text>
            )}
          </View>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityControl}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => {
              dispatch(updateCartQuantity(item.id, item.quantity - 1) as any);
            }}
          >
            <Ionicons name="remove" size={16} color={CoveColors.textPrimary} />
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable
            style={styles.quantityButton}
            onPress={() => {
              dispatch(updateCartQuantity(item.id, item.quantity + 1) as any);
            }}
          >
            <Ionicons name="add" size={16} color={CoveColors.textPrimary} />
          </Pressable>
        </View>
        <Pressable
          style={styles.removeButton}
          onPress={() => {
            dispatch(removeFromCart(item.id) as any);
          }}
        >
          <Ionicons name="trash-outline" size={20} color="#FF4444" />
        </Pressable>
      </View>
    </View>
  );

  const shippingCost = totalPrice >= 75 ? 0 : 10;
  const finalTotal = totalPrice + shippingCost;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Cart</Text>
            {items.length > 0 && (
              <Text style={styles.itemCount}>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bag-outline" size={64} color={CoveColors.textSecondary} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyMessage}>Add some items to get started!</Text>
          </View>
        }
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {shippingCost === 0 ? (
                  <Text style={{ color: CoveColors.primary, fontWeight: '600' }}>Free</Text>
                ) : (
                  `$${shippingCost.toFixed(2)}`
                )}
              </Text>
            </View>
            {totalPrice < 75 && (
              <Text style={styles.freeShippingInfo}>
                Free shipping on orders over $75
              </Text>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
            </View>
          </View>

          <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </Pressable>

          <Pressable style={styles.continueShoppingButton} onPress={() => {}}>
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </Pressable>
        </View>
      )}
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
  itemCount: {
    fontSize: 13,
    color: CoveColors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: CoveColors.border,
    gap: 12,
  },
  itemDetails: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#D9C7AF',
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: CoveColors.textPrimary,
  },
  itemMeta: {
    gap: 2,
  },
  itemMetaText: {
    fontSize: 12,
    color: CoveColors.textSecondary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: CoveColors.textPrimary,
    marginTop: 4,
  },
  itemActions: {
    gap: 12,
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: CoveColors.border,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '600',
    color: CoveColors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
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
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: CoveColors.border,
    backgroundColor: CoveColors.card,
    gap: 12,
  },
  summary: {
    gap: 8,
    paddingBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 13,
    color: CoveColors.textSecondary,
  },
  summaryValue: {
    fontSize: 13,
    color: CoveColors.textPrimary,
    fontWeight: '500',
  },
  freeShippingInfo: {
    fontSize: 11,
    color: CoveColors.primary,
    fontWeight: '500',
    marginTop: 4,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: CoveColors.border,
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: CoveColors.textPrimary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: CoveColors.primary,
  },
  checkoutButton: {
    backgroundColor: CoveColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  continueShoppingButton: {
    borderWidth: 1,
    borderColor: CoveColors.border,
    borderRadius: 8,
    paddingVertical: 12,
  },
  continueShoppingText: {
    color: CoveColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
