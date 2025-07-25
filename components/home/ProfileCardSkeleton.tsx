import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export default function ProfileCardSkeleton() {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
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
  }, [pulseAnim]);

  return (
    <Animated.View
      style={{ opacity: pulseAnim }}
      className="flex-row items-center bg-gray-200 rounded-xl p-4 mx-4 mt-4"
    >
      <View className="w-16 h-16 rounded-full bg-gray-400" />
      <View className="flex-1 ml-4">
        <View className="w-30 h-4 rounded-md bg-gray-300 mb-2" />
        <View className="w-44 h-4 rounded-md bg-gray-300" />
      </View>
    </Animated.View>
  );
}
