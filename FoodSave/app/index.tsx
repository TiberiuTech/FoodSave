import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.background}
      />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=640' }}
        style={styles.heroImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>FoodSave</Text>
        <Text style={styles.slogan}>
          Food is too precious to waste!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(auth)/benefits')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  heroImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  slogan: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2E7D32',
  },
});