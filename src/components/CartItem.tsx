import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, Button } from 'react-native-paper';
import { CartItem as CartItemType } from '../types/navigation';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const lineTotal = item.product.price * item.quantity;

  return (
    <Card style={styles.card} elevation={1}>
      <Card.Content>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Text>🖼️</Text>
          </View>
          <View style={styles.details}>
            <Text numberOfLines={2} style={styles.title}>
              {item.product.title}
            </Text>
            <Text style={styles.price}>${item.product.price.toFixed(2)} each</Text>
            
            <View style={styles.quantityRow}>
              <View style={styles.quantityControls}>
                <IconButton
                  icon="minus"
                  size={16}
                  onPress={() => onUpdateQuantity(item.quantity - 1)}
                />
                <Text style={styles.quantity}>{item.quantity}</Text>
                <IconButton
                  icon="plus"
                  size={16}
                  onPress={() => onUpdateQuantity(item.quantity + 1)}
                />
              </View>
              <Text style={styles.lineTotal}>${lineTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>
        <Button 
          icon="delete" 
          onPress={onRemove}
          style={styles.removeButton}
          color="#ff4444"
        >
          Remove
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 30,
    textAlign: 'center',
  },
  lineTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  removeButton: {
    marginTop: 8,
  },
});

export default CartItemComponent;