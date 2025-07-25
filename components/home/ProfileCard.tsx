import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Provider } from 'react-native-paper';

type ProfileCardProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function ProfileCard({ name, email, avatarUrl }: ProfileCardProps) {

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
          <MaterialIcons name="notifications" size={32} color="#e5b32bff" />
        </TouchableOpacity>
        
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
    zIndex: 50,
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
