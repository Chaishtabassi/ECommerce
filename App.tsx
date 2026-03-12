import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { CartProvider } from './src/context/CartContext';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const ProductsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProductList" 
      component={ProductListScreen} 
      options={{ title: 'Products' }}
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen} 
      options={{ title: 'Product Details' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <PaperProvider>
      <CartProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = '';
                if (route.name === 'Products') {
                  iconName = 'store';
                } else if (route.name === 'Cart') {
                  iconName = 'shopping-cart';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#6200ee',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen 
              name="Products" 
              component={ProductsStack} 
              options={{ headerShown: false }}
            />
            <Tab.Screen 
              name="Cart" 
              component={CartScreen} 
              options={{ title: 'Shopping Cart' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </CartProvider>
    </PaperProvider>
  );
};

export default App;