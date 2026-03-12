// src/components/ProductCard.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Text, Chip, useTheme } from 'react-native-paper';
import { Product } from '../types/navigation';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.wrapper}>
      <Card style={styles.card} elevation={3}>
        
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <Card.Content style={styles.content}>
          
          <Text numberOfLines={2} style={styles.title}>
            {product.title}
          </Text>

          {/* Category */}
          <Chip style={styles.category} textStyle={styles.categoryText}>
            {product.category}
          </Chip>

          {/* Price + Rating */}
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>
              ${product.price.toFixed(2)}
            </Text>

            <View style={styles.rating}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.ratingText}>{product.rating.rate}</Text>
              <Text style={styles.ratingCount}>({product.rating.count})</Text>
            </View>
          </View>

        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
  wrapper: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 140,
    padding: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    minHeight: 34,
  },
  category: {
    alignSelf: 'flex-start',
    // height: 22,
    marginBottom: 6,
    backgroundColor: '#f2f2f2',
  },
  categoryText: {
    fontSize: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 2,
    fontWeight: '500',
  },
  ratingCount: {
    fontSize: 10,
    color: '#777',
    marginLeft: 2,
  },
});

export default ProductCard;