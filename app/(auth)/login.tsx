import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthContext';
import { loginAction } from '@/utils/api';

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
      </View>

      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Icon name="email-outline" size={22} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Icon name="lock-outline" size={22} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        disabled={loading}
      >
        <Text style={styles.loginText}>{loading ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Link href="/(auth)/register" style={styles.signUpLink}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72', // ganti LinearGradient dengan warna solid
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  forgotText: {
    color: '#aaa',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#36d1dc',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 40,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpText: {
    color: '#ccc',
    textAlign: 'center',
  },
  signUpLink: {
    color: '#36d1dc',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
