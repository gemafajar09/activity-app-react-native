import ProfileCard from '@/components/home/ProfileCard';
import { getUserProfile } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function HomeScreen() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await getUserProfile();
          setUser(data);
        } catch (err) {
          console.log('Gagal ambil data user:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []);

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {loading ? (
            <SkeletonPlaceholder borderRadius={12}>
              <View style={styles.card}>
                <View style={styles.avatar} />
                <View style={{ marginLeft: 16 }}>
                  <View style={{ width: 120, height: 20, marginBottom: 6 }} />
                  <View style={{ width: 180, height: 20 }} />
                </View>
              </View>
            </SkeletonPlaceholder>
          ) : (
            user && (
              <ProfileCard
                name={user.name}
                email={user.email}
                avatarUrl={'https://i.pravatar.cc/150?img=12'}
              />
            )
          )}

          <View style={styles.content}>
            <Text style={styles.text}>Konten Home lainnya...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 16,
      color: '#444',
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 16,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: '#ccc',
    },
});
