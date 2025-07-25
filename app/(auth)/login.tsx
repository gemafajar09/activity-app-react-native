import { AuthContext } from '@/context/AuthContext';
import { loginAction } from '@/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Email dan password wajib diisi');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const data = await loginAction(email, password);
      const token = data.token;

      await AsyncStorage.setItem('userToken', token);
      login && login(token);
      router.replace('/(dashboard)/home');
    } catch (error: any) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Terjadi kesalahan saat login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#1e3c72] px-8 justify-center">
      <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />

      <View className="items-center mb-10">
        <Text className="text-2xl text-white font-bold">Welcome Back!</Text>
      </View>

      {errorMsg ? (
        <Text className="text-red-500 text-center mb-2">{errorMsg}</Text>
      ) : null}

      <View className="mb-5">
        {/* Email Input */}
        <View className="flex-row items-center border-b border-gray-500 mb-5 pb-1">
          <Icon name="email-outline" size={22} color="#fff" className="mr-2" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            className="flex-1 text-white"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity>
        <Text className="text-gray-400 self-end mb-8">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        className={`bg-[#36d1dc] py-3 rounded-full items-center mb-10 ${loading ? 'opacity-70' : ''}`}
        disabled={loading}
      >
        <Text className="text-white text-base font-semibold">
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-300">
        Don't have an account?{' '}
        <Link href="/(auth)/register" className="text-[#36d1dc] font-bold">
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default LoginScreen;
