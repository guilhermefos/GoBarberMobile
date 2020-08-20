/* eslint-disable react/prop-types */
import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface DataState {
  user: object;
  token: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: object;
  loading: boolean;
  signOut(): void;
  signIn(credentials: Credentials): Promise<void>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<DataState>({} as DataState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({email, password}: Credentials) => {
    const response = await api.post('sessions', {email, password});

    const {user, token} = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', user],
    ]);

    setData({user, token});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as DataState);
  }, []);

  return (
    <AuthContext.Provider value={{user: data.user, signIn, loading, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
