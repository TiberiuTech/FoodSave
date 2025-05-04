import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, Building2, ArrowLeft, MapPin } from 'lucide-react-native';
import { useState } from 'react';
import { useStore, UserType } from '@/lib/store';

export default function RegisterScreen() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<UserType>('user');
  const { setUserType } = useStore();

  const handleRegister = () => {
    setUserType(accountType);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft color="#000" size={24} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Choose account type to get started</Text>
      </View>

      <View style={styles.accountTypeContainer}>
        <TouchableOpacity
          style={[
            styles.accountTypeButton,
            accountType === 'user' && styles.accountTypeButtonActive,
          ]}
          onPress={() => setAccountType('user')}
        >
          <User
            color={accountType === 'user' ? '#fff' : '#666'}
            size={24}
          />
          <Text
            style={[
              styles.accountTypeText,
              accountType === 'user' && styles.accountTypeTextActive,
            ]}
          >
            User
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.accountTypeButton,
            accountType === 'business' && styles.accountTypeButtonActive,
          ]}
          onPress={() => setAccountType('business')}
        >
          <Building2
            color={accountType === 'business' ? '#fff' : '#666'}
            size={24}
          />
          <Text
            style={[
              styles.accountTypeText,
              accountType === 'business' && styles.accountTypeTextActive,
            ]}
          >
            Business
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Mail color="#666" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock color="#666" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
        </View>

        {accountType === 'business' && (
          <View style={styles.inputContainer}>
            <MapPin color="#666" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Business Address"
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginButtonText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  backButton: {
    marginTop: 24,
    marginBottom: 32,
  },
  header: {
    marginBottom: 32,
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
  },
  accountTypeContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  accountTypeButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    gap: 8,
  },
  accountTypeButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  accountTypeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
  },
  accountTypeTextActive: {
    color: '#fff',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});