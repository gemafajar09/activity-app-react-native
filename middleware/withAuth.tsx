import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';

export function withAuth(Component: React.ComponentType) {
  return function AuthWrapped(props: any) {
    const { userToken, logout, loading } = useContext(AuthContext);
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      if (loading) return;
      const checkToken = async () => {
        if (!userToken) {
          router.replace('/login');
          return;
        }

        try {
          const decoded: any = jwtDecode(userToken);
          const now = Date.now() / 1000;
          if (decoded.exp < now) {
            await logout();
            router.replace('/login'); 
          } else {
            setChecking(false);
          }
        } catch (error) {
          await logout();
          router.replace('/login');
        }
      };

      checkToken();
    }, [userToken, loading]);

    if (loading || checking) return null;

    return <Component {...props} />;
  };
}
