import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {
  Text,
  ActivityIndicator,
  Snackbar,
  FAB,
  Badge,
} from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { fetchProducts } from '../services/api';
import { Product } from '../types/navigation';
import { RootStackParamList } from '../types/navigation';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

type ProductListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const navigation = useNavigation<ProductListScreenNavigationProp>();
  const { getItemCount } = useCart();

  const loadProducts = async () => {
    try {
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.cardWrapper}>
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item.id)}
      />
    </View>
  );

  const cartItemCount = getItemCount();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading Products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !error ? (
            <View style={styles.centerContainer}>
              <Text>No products available</Text>
            </View>
          ) : null
        }
      />

      {cartItemCount > 0 && (
        <View style={styles.cartWrapper}>
          <View style={styles.fabContainer}>
            <FAB
              icon="cart"
              style={styles.fab}
              color="white"
              onPress={() => navigation.navigate('Cart' as never)}
            />
            {/* <Badge style={styles.badge}>{cartItemCount}</Badge> */}
          </View>
        </View>
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Retry',
          onPress: loadProducts,
        }}
      >
        {error || 'Something went wrong'}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  fabContainer: {
    position: 'relative',
  },
  cartWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fab: {
    backgroundColor: '#6200ee',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    zIndex: 10,
  }
});

export default ProductListScreen;