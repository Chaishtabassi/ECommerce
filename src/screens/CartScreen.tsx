import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Card, Divider, Snackbar, Dialog, Portal } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { useCart } from '../context/CartContext';
import CartItemComponent from '../components/CartItem';

const CartScreen = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [checkoutDialog, setCheckoutDialog] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, [])
  );

  const handleCheckout = () => {
    setCheckoutDialog(true);
  };

  const confirmCheckout = () => {
    setCheckoutDialog(false);
    clearCart();
    setSnackbarVisible(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <CartItemComponent
      item={item}
      onUpdateQuantity={(quantity) => updateQuantity(item.product.id, quantity)}
      onRemove={() => removeFromCart(item.product.id)}
    />
  );

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>
          Looks like you haven't added anything to your cart yet
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.list}
      />

      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping:</Text>
            <Text style={styles.summaryValue}>$5.00</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${(totalPrice + 5).toFixed(2)}</Text>
          </View>

          <Button
            mode="contained"
            onPress={handleCheckout}
            style={styles.checkoutButton}
            contentStyle={styles.buttonContent}
          >
            Proceed to Checkout
          </Button>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={checkoutDialog} onDismiss={() => setCheckoutDialog(false)}>
          <Dialog.Title>Checkout</Dialog.Title>
          <Dialog.Content>
            <Text>Thank you for your order!</Text>
            <Text style={styles.dialogText}>Total: ${(totalPrice + 5).toFixed(2)}</Text>
            <Text style={styles.dialogSubtext}>
              This is a demo app - no payment will be processed.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCheckoutDialog(false)}>Cancel</Button>
            <Button onPress={confirmCheckout}>Confirm Order</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Order placed successfully! Thank you for shopping.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  summaryCard: {
    margin: 8,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  checkoutButton: {
    marginTop: 16,
  },
  buttonContent: {
    height: 48,
  },
  dialogText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  dialogSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default CartScreen;