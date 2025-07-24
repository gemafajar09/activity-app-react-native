import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export function withAuth(Component: React.ComponentType) {
  return function AuthWrapped(props: any) {
    const { userToken, logout } = useContext(AuthContext);
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const checkToken = async () => {
        if (!userToken) {
          router.replace('/login');
          return;
        }

        try {
          const decoded: any = jwtDecode(userToken);
          const now = Date.now() / 1000;
          if (decoded.exp < now) {
            // Token expired
            await logout();
            router.replace('/login'); 
          } else {
            // Token valid
            setChecking(false);
          }
        } catch (error) {
          // Token invalid
          await logout();
          router.replace('/login');
        }
      };

      checkToken();
    }, [userToken]);

    if (checking) return null; // Bisa diganti loading spinner

    return <Component {...props} />;
  };
}
