import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, ShoppingBag, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useStore, Product } from '@/lib/store';

const products = [
  {
    id: '1',
    title: 'Pizza Margherita',
    price: 15,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=640',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    validUntil: '21:00',
    location: 'Pizza Hut - Iulius Mall',
    distance: '1.2 km',
  },
  {
    id: '2',
    title: 'Classic Burger',
    price: 20,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=640',
    description: 'Beef burger with cheddar cheese, lettuce, and tomatoes',
    validUntil: '22:00',
    location: 'Burger House - Union Square',
    distance: '0.8 km',
  },
  {
    id: '3',
    title: 'Pasta Carbonara',
    price: 25,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=640',
    description: 'Fresh pasta with carbonara sauce and parmesan',
    validUntil: '20:00',
    location: 'La Strada - Downtown',
    distance: '1.5 km',
  },
  {
    id: '4',
    title: 'Caesar Salad',
    price: 18,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=640',
    description: 'Fresh salad with grilled chicken and caesar dressing',
    validUntil: '19:00',
    location: 'Fresh Bistro - Central Park',
    distance: '0.5 km',
  },
  {
    id: '5',
    title: 'Sushi Mix',
    price: 35,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=640',
    description: '12-piece sushi set with salmon, tuna, and avocado',
    validUntil: '20:30',
    location: 'Sushi Master - Shopping City',
    distance: '2.1 km',
  },
  {
    id: '6',
    title: 'Cream Soup',
    price: 12,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=640',
    description: 'Vegetable cream soup with croutons and sour cream',
    validUntil: '21:30',
    location: 'Soup & Sandwich - Republic Street',
    distance: '0.3 km',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart, toggleFavorite, favorites, searchQuery, setSearchQuery } = useStore();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    router.push('/cart');
  };

  const isFavorite = (productId: string) => {
    return favorites.some((product) => product.id === productId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Offers</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#666" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products or locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.offerCard}>
            <Image 
              source={{ uri: product.image }}
              style={styles.offerImage}
            />
            <View style={styles.offerContent}>
              <View style={styles.offerHeader}>
                <View>
                  <Text style={styles.offerTitle}>{product.title}</Text>
                  <Text style={styles.offerPrice}>${product.price}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(product)}
                  >
                    <Heart
                      color={isFavorite(product.id) ? '#FF5252' : '#666'}
                      fill={isFavorite(product.id) ? '#FF5252' : 'none'}
                      size={20}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(product)}
                  >
                    <ShoppingBag color="#fff" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.offerDescription}>{product.description}</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.location}>{product.location}</Text>
                <Text style={styles.distance}>{product.distance}</Text>
              </View>
              <Text style={styles.validUntil}>Available until {product.validUntil}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  offerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  offerContent: {
    padding: 16,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  offerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  offerPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#4CAF50',
  },
  offerDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  distance: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  validUntil: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});