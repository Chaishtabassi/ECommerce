# E-Commerce Mini App - React Native

A functional e-commerce mobile application built with React Native and TypeScript. The app features product listing, product details, and a shopping cart with complete cart management functionality.

## Framework Choice: React Native

I chose React Native for this project because:
- **TypeScript Support**: Excellent TypeScript integration for type safety
- **Rich Ecosystem**: Mature libraries for navigation, state management, and UI components
- **Development Speed**: Fast refresh and hot reloading capabilities
- **Cross-Platform**: Single codebase for both iOS and Android
- **Community**: Large community and extensive documentation

## Features

### Product Listing Screen
- Fetches products from Fake Store API
- Grid layout with 2 columns
- Each card shows image, name, price, and category
- Loading states with activity indicator
- Pull-to-refresh functionality
- Error handling with retry option
- Floating cart button with item count badge

### Product Detail Screen
- Detailed product information
- High-resolution product image
- Title, price, category, and rating
- Full description
- "Add to Cart" button with feedback
- Navigation back to product list

### Shopping Cart Screen
- List of cart items with quantities
- Adjust quantities (+/- buttons)
- Remove items from cart
- Running subtotal and total (with shipping)
- Empty cart state handling
- Checkout confirmation dialog
- Cart persistence during session

## Technical Stack

- **React Native** (0.72.6)
- **TypeScript** for type safety
- **React Navigation** (Bottom Tabs + Native Stack)
- **React Native Paper** for UI components
- **Axios** for API calls
- **Context API** for state management
- **React Native Vector Icons** for icons
