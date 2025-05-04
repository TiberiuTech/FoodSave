import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Leaf, Apple, ShoppingBag, UtensilsCrossed, Scale, Clock, Camera, MapPin } from 'lucide-react-native';
import { useStore } from '@/lib/store';

export default function AddScreen() {
  const { userType } = useStore();

  // If user is a business account, show the product form
  if (userType === 'business') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Product</Text>
        </View>

        <ScrollView style={styles.content}>
          <TouchableOpacity style={styles.imageUpload}>
            <Camera color="#666" size={32} />
            <Text style={styles.imageUploadText}>Add Photo</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Product Name</Text>
              <TextInput 
                style={styles.input}
                placeholder="Ex: Pizza Margherita"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price</Text>
              <TextInput 
                style={styles.input}
                placeholder="Ex: 15"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <View style={styles.locationInput}>
                <MapPin color="#666" size={20} />
                <TextInput 
                  style={styles.input}
                  placeholder="Your location address"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Available until</Text>
              <TextInput 
                style={styles.input}
                placeholder="Ex: 21:00"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput 
                style={[styles.input, styles.textArea]}
                placeholder="Describe your product..."
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Publish Offer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  // For regular users, show food waste reduction tips
  const tips = [
    {
      icon: ShoppingBag,
      title: 'Plan Your Shopping',
      description: 'Make a list before shopping and stick to it to avoid impulse purchases.',
      image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=640'
    },
    {
      icon: Scale,
      title: 'Right Portions',
      description: 'Cook the right amount of food to avoid waste. Use a scale for precise portions.',
      image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=640'
    },
    {
      icon: Clock,
      title: 'Organize Your Fridge',
      description: 'Arrange food by expiration date and keep it visible to consume on time.',
      image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=640'
    },
    {
      icon: UtensilsCrossed,
      title: 'Reuse Leftovers',
      description: 'Transform leftovers into a new and delicious meal instead of throwing them away.',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=640'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anti-Waste Tips</Text>
        <Text style={styles.headerSubtitle}>Together we reduce food waste</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.banner}>
          <Leaf color="#4CAF50" size={32} />
          <Text style={styles.bannerTitle}>Did you know?</Text>
          <Text style={styles.bannerText}>
            On average, one-third of all food produced globally is wasted. 
            Together we can change this!
          </Text>
        </View>

        {tips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <Image 
              source={{ uri: tip.image }}
              style={styles.tipImage}
            />
            <View style={styles.tipContent}>
              <View style={styles.tipHeader}>
                <tip.icon color="#4CAF50" size={24} />
                <Text style={styles.tipTitle}>{tip.title}</Text>
              </View>
              <Text style={styles.tipDescription}>{tip.description}</Text>
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
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  banner: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2E7D32',
    marginVertical: 8,
  },
  bannerText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1B5E20',
    textAlign: 'center',
    lineHeight: 24,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
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
  tipImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  tipContent: {
    padding: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  tipDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 24,
  },
  // Business form styles
  imageUpload: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  imageUploadText: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});