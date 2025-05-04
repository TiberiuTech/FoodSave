import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Building2, ArrowLeft, ShoppingBag, Star, Clock, Gift, ChartBar, HandHeart, BadgePercent, Bell, Users } from 'lucide-react-native';

export default function BenefitsScreen() {
  const router = useRouter();

  const userBenefits = [
    {
      icon: ShoppingBag,
      title: 'Save Money',
      description: 'Find deals with up to 70% off at local restaurants',
    },
    {
      icon: Clock,
      title: 'Quick Orders',
      description: 'Book and pick up your order at the set time, no waiting',
    },
    {
      icon: Star,
      title: 'Quality Products',
      description: 'Fresh food from verified restaurants',
    },
    {
      icon: Gift,
      title: 'Rewards Program',
      description: 'Earn points with every order and get exclusive discounts',
    },
  ];

  const businessBenefits = [
    {
      icon: ChartBar,
      title: 'Reduce Waste',
      description: 'Turn surplus food into additional profit',
    },
    {
      icon: Users,
      title: 'New Customers',
      description: 'Attract customers looking for deals and culinary experiences',
    },
    {
      icon: HandHeart,
      title: 'Social Impact',
      description: 'Help reduce food waste in your community',
    },
    {
      icon: BadgePercent,
      title: 'Effective Marketing',
      description: 'Free promotion and increased visibility for your business',
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft color="#000" size={24} />
      </TouchableOpacity>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose the right account for you</Text>
        <Text style={styles.subtitle}>
          FoodSave helps you save money and reduce food waste
        </Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User color="#4CAF50" size={32} />
            <Text style={styles.sectionTitle}>Personal Account</Text>
          </View>
          
          <View style={styles.benefitsList}>
            {userBenefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <benefit.icon color="#4CAF50" size={24} />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, styles.userButton]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.buttonText}>Create Personal Account</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Building2 color="#2196F3" size={32} />
            <Text style={[styles.sectionTitle, styles.businessTitle]}>Business Account</Text>
          </View>
          
          <View style={styles.benefitsList}>
            {businessBenefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <benefit.icon color="#2196F3" size={24} />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, styles.businessButton]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.buttonText}>Register Your Business</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    margin: 24,
    marginTop: 48,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 32,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lastSection: {
    marginBottom: 48,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#4CAF50',
  },
  businessTitle: {
    color: '#2196F3',
  },
  benefitsList: {
    gap: 16,
    marginBottom: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 20,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  userButton: {
    backgroundColor: '#4CAF50',
  },
  businessButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});