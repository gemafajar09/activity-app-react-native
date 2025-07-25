import { Link } from 'expo-router';
import React from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen = () => {
  return (
    <View className="flex-1 bg-[#203a43] px-8 justify-center">
      <StatusBar barStyle="light-content" backgroundColor="#203a43" />

      <View className="items-center mb-10">
        <Text className="text-2xl text-white font-bold">Create Account</Text>
      </View>

      <View className="mb-5">
        {/* Name Input */}
        <View className="flex-row items-center border-b border-gray-500 mb-5 pb-1">
          <Icon name="account-outline" size={22} color="#fff" className="mr-2" />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#aaa"
            className="flex-1 text-white"
          />
        </View>

        {/* Email Input */}
        <View className="flex-row items-center border-b border-gray-500 mb-5 pb-1">
          <Icon name="email-outline" size={22} color="#fff" className="mr-2" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            className="flex-1 text-white"
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center border-b border-gray-500 mb-5 pb-1">
          <Icon name="lock-outline" size={22} color="#fff" className="mr-2" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            className="flex-1 text-white"
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity className="bg-[#36d1dc] py-3 rounded-full items-center mb-5">
        <Text className="text-white text-base font-semibold">Register</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-300">
        Already have an account?{' '}
        <Link href="/(auth)/login" className="text-[#36d1dc] font-bold">
          Login
        </Link>
      </Text>
    </View>
  );
};

export default RegisterScreen;
