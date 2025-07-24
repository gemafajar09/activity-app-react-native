import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import { AuthContext } from '@/context/AuthContext';
import { router } from 'expo-router';

type ProfileCardProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function ProfileCard({ name, email, avatarUrl }: ProfileCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  
  const { logout } = useContext(AuthContext);
  
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSetting = () => {
    closeMenu();
    console.log('Navigasi ke Setting');
  };

  const handleLogout = async () => {
    closeMenu();
    await logout();
    router.replace('/(auth)/login');
  };


  return (
    <Provider>
      <View style={styles.card}>
        
        <Image
          source={
            avatarUrl
              ? { uri: avatarUrl }
              : require('../../assets/profile/user.png')
          }
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <TouchableOpacity style={styles.leftIcon}>
          <MaterialIcons name="notifications" size={28} color="#e5b32bff" />
        </TouchableOpacity>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Feather name="more-vertical" size={22} color="#555" />
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={handleSetting} title="Setting" />
          <Menu.Item onPress={handleLogout} title="Logout" />
        </Menu>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    alignItems: 'center',
    position: 'relative',
  },
  leftIcon: {
    marginRight: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
});
