import ClockInOut from '@/components/home/ClockInOut';
import ProfileCard from '@/components/home/ProfileCard';
import ProfileCardSkeleton from '@/components/home/ProfileCardSkeleton';
import { getUserProfile } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {loading ? (
            <ProfileCardSkeleton />
          ) : (
            user && (
              <ProfileCard
                name={user.name}
                email={user.email}
                avatarUrl={'https://i.pravatar.cc/150?img=12'}
              />
            )
          )}
          <ClockInOut />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
});
