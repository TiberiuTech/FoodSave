import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch, Modal } from 'react-native';
import { Settings, History, Heart, LogOut, Bell, Moon, Globe, MapPin, CreditCard } from 'lucide-react-native';
import { useStore, languages } from '@/lib/store';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function ProfileScreen() {
  const { orders, favorites, settings, updateSettings } = useStore();
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const recentOrders = orders.slice(0, 3);

  const toggleNotifications = () => {
    updateSettings({ notifications: !settings.notifications });
  };

  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const setLanguage = (languageCode) => {
    updateSettings({ language: languageCode });
    setShowLanguageModal(false);
  };

  const selectedLanguage = languages.find(lang => lang.code === settings.language);

  return (
    <View style={[styles.container, settings.darkMode && styles.darkContainer]}>
      <View style={[styles.header, settings.darkMode && styles.darkHeader]}>
        <Text style={[styles.headerTitle, settings.darkMode && styles.darkText]}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.profile, settings.darkMode && styles.darkSection]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=640' }}
            style={styles.avatar}
          />
          <Text style={[styles.name, settings.darkMode && styles.darkText]}>John Doe</Text>
          <Text style={[styles.email, settings.darkMode && styles.darkSubtext]}>john@example.com</Text>
        </View>

        <View style={[styles.section, settings.darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, settings.darkMode && styles.darkText]}>Recent Orders</Text>
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <View key={order.id} style={[styles.orderItem, settings.darkMode && styles.darkItem]}>
                <View>
                  <Text style={[styles.orderDate, settings.darkMode && styles.darkSubtext]}>
                    {new Date(order.date).toLocaleDateString()}
                  </Text>
                  <Text style={[styles.orderTotal, settings.darkMode && styles.darkText]}>${order.total}</Text>
                </View>
                <Text style={[
                  styles.orderStatus,
                  order.status === 'completed' && styles.statusCompleted,
                  order.status === 'cancelled' && styles.statusCancelled,
                ]}>
                  {order.status}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.emptyText, settings.darkMode && styles.darkSubtext]}>No orders yet</Text>
          )}
        </View>

        <View style={[styles.section, settings.darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, settings.darkMode && styles.darkText]}>Activity</Text>
          <TouchableOpacity 
            style={[styles.menuItem, settings.darkMode && styles.darkItem]}
            onPress={() => router.push('/orders')}
          >
            <History color={settings.darkMode ? "#fff" : "#666"} size={24} />
            <Text style={[styles.menuText, settings.darkMode && styles.darkText]}>Order History</Text>
            <Text style={styles.menuCount}>{orders.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, settings.darkMode && styles.darkItem]}
            onPress={() => router.push('/favorites')}
          >
            <Heart color={settings.darkMode ? "#fff" : "#666"} size={24} />
            <Text style={[styles.menuText, settings.darkMode && styles.darkText]}>Favorites</Text>
            <Text style={styles.menuCount}>{favorites.length}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, settings.darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, settings.darkMode && styles.darkText]}>App Settings</Text>
          
          <View style={[styles.settingItem, settings.darkMode && styles.darkItem]}>
            <View style={styles.settingLeft}>
              <Bell color={settings.darkMode ? "#fff" : "#666"} size={24} />
              <Text style={[styles.settingText, settings.darkMode && styles.darkText]}>Notifications</Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#ddd', true: '#4CAF50' }}
              thumbColor={settings.notifications ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={[styles.settingItem, settings.darkMode && styles.darkItem]}>
            <View style={styles.settingLeft}>
              <Moon color={settings.darkMode ? "#fff" : "#666"} size={24} />
              <Text style={[styles.settingText, settings.darkMode && styles.darkText]}>Dark Mode</Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#ddd', true: '#4CAF50' }}
              thumbColor={settings.darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity 
            style={[styles.menuItem, settings.darkMode && styles.darkItem]}
            onPress={() => setShowLanguageModal(true)}
          >
            <Globe color={settings.darkMode ? "#fff" : "#666"} size={24} />
            <Text style={[styles.menuText, settings.darkMode && styles.darkText]}>Language</Text>
            <Text style={[styles.menuValue, settings.darkMode && styles.darkSubtext]}>
              {selectedLanguage?.flag} {selectedLanguage?.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, settings.darkMode && styles.darkItem]}>
            <MapPin color={settings.darkMode ? "#fff" : "#666"} size={24} />
            <Text style={[styles.menuText, settings.darkMode && styles.darkText]}>Default Location</Text>
            <Text style={[styles.menuValue, settings.darkMode && styles.darkSubtext]}>Set</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, settings.darkMode && styles.darkItem]}>
            <CreditCard color={settings.darkMode ? "#fff" : "#666"} size={24} />
            <Text style={[styles.menuText, settings.darkMode && styles.darkText]}>Payment Methods</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.menuItem, styles.logoutButton, settings.darkMode && styles.darkLogoutButton]}>
          <LogOut color="#FF5252" size={24} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, settings.darkMode && styles.darkModalContent]}>
            <Text style={[styles.modalTitle, settings.darkMode && styles.darkText]}>
              Select Language
            </Text>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  settings.darkMode && styles.darkLanguageOption,
                  settings.language === language.code && (settings.darkMode ? styles.darkSelectedLanguage : styles.selectedLanguage)
                ]}
                onPress={() => setLanguage(language.code)}
              >
                <View style={styles.languageRow}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={[
                    styles.languageText,
                    settings.darkMode && styles.darkText,
                    settings.language === language.code && styles.selectedLanguageText
                  ]}>
                    {language.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.closeButton, settings.darkMode && styles.darkCloseButton]}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={[styles.closeButtonText, settings.darkMode && styles.darkText]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkHeader: {
    backgroundColor: '#121212',
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  section: {
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkSection: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 8,
  },
  darkItem: {
    backgroundColor: '#2D2D2D',
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  orderStatus: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
    textTransform: 'capitalize',
  },
  statusCompleted: {
    color: '#4CAF50',
  },
  statusCancelled: {
    color: '#FF5252',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  menuCount: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  menuValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 32,
  },
  darkLogoutButton: {
    backgroundColor: '#2D2D2D',
  },
  logoutText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FF5252',
  },
  darkText: {
    color: '#fff',
  },
  darkSubtext: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  darkModalContent: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333',
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  darkLanguageOption: {
    backgroundColor: '#2D2D2D',
  },
  selectedLanguage: {
    backgroundColor: '#E8F5E9',
  },
  darkSelectedLanguage: {
    backgroundColor: '#1B5E20',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
  },
  selectedLanguageText: {
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
  },
  darkCloseButton: {
    backgroundColor: '#2D2D2D',
  },
  closeButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
});