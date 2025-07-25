import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-native-paper';

type ProfileCardProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function ProfileCard({ name, email, avatarUrl }: ProfileCardProps) {
  return (
    <Provider>
      <View className="flex-row items-center bg-white p-4 mx-4 mt-4 rounded-xl shadow-md relative z-50">
        <Image
          source={
            avatarUrl
              ? { uri: avatarUrl }
              : require('../../assets/profile/user.png')
          }
          className="w-16 h-16 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{name}</Text>
          <Text className="text-sm text-gray-500 mt-1">{email}</Text>
        </View>

        <TouchableOpacity className="mr-3">
          <MaterialIcons name="notifications" size={32} color="#e5b32bff" />
        </TouchableOpacity>
      </View>
    </Provider>
  );
}
