import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function ProfileCardSkeleton() {
  const pulseAnim = new Animated.Value(0.3);

  Animated.loop(
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 0.3,
        duration: 800,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <Animated.View style={[styles.card, { opacity: pulseAnim }]}>
      <View style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.lineShort} />
        <View style={styles.lineLong} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#eee',
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
  info: {
    marginLeft: 16,
    flex: 1,
  },
  lineShort: {
    width: 120,
    height: 16,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  lineLong: {
    width: 180,
    height: 16,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
});
