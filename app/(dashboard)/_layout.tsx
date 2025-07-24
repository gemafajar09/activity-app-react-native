import { Tabs } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import type { GestureResponderEvent } from 'react-native';
import { View } from '@/components/Themed';

type NoShadowTabBarButtonProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

function NoShadowTabBarButton(props: NoShadowTabBarButtonProps) {
  const { onPress, children, ...rest } = props;
  return (
     <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 0 },
        }}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 85,
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          elevation: 0,
          shadowColor: 'transparent',
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: { height: 0, width: 0 },
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 10,
          paddingHorizontal: 12,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
      }}
    >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
            tabBarButton: (props) => <NoShadowTabBarButton {...props} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="info" size={size} color={color} />
            ),
            tabBarButton: (props) => <NoShadowTabBarButton {...props} />,
          }}
        />
        <Tabs.Screen
          name="berita"
          options={{
            title: 'Berita',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="newspaper" size={size} color={color} />
            ),
            tabBarButton: (props) => <NoShadowTabBarButton {...props} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-alt" size={size} color={color} />
            ),
            tabBarButton: (props) => <NoShadowTabBarButton {...props} />,
          }}
        />
    </Tabs>
  );
}
