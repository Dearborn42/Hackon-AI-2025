import React, { useState, createContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

// Define the context type
type UserContextType = {
  streak: number;
  level: number[];
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  setLevel: React.Dispatch<React.SetStateAction<number[]>>;
  loadUserData: (email: string, password: string) => Promise<void>;
  saveUserData: (email: string, password: string) => Promise<void>;
  signUpUser: (email: string, password: string) => Promise<boolean>;
};

// Create the context
export const UserContext = createContext<UserContextType>({
  streak: 0,
  level: [0, 0, 0, 0, 0],
  setStreak: () => {},
  setLevel: () => {},
  loadUserData: async () => {},
  saveUserData: async () => {},
  signUpUser: async () => false,
});

// Provider props
type UserContextProviderProps = {
  children: ReactNode;
};

// Provider component
export function UserContextProvider({ children }: UserContextProviderProps) {
  const router = useRouter();
  const [streak, setStreak] = useState<number>(1);
  const [level, setLevel] = useState<number[]>([0, 0, 0, 0, 0,]);

  // Load user data from SecureStore if it exists
  const loadUserData = async (email: string, password: string) => {
    try {
      const key = `${email}${password}`;
      const storedData = await SecureStore.getItemAsync(key);

      if (storedData) {
        const parsed = JSON.parse(storedData);
        if (parsed.streak && parsed.level !== undefined) {
          setStreak(parsed.streak);
          setLevel(parsed.level);
        }
      } else {
        console.log('No stored data found for this user.');
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  // Save user data to SecureStore
  const saveUserData = async (email: string, password: string) => {
    try {
      const key = `${email}${password}`;
      const data = JSON.stringify({ streak, level });
      await SecureStore.setItemAsync(key, data);
    } catch (err) {
      console.error('Error saving user data:', err);
    }
  };
  const signUpUser = async (email: string, password: string): Promise<boolean> => {
    try {
      if(email == "" || password == ""){
        return false;
      }
      var emailSplit = email.split("@")
      const key = `${emailSplit[0]}${emailSplit[1]}${password}`;
      const existing = await SecureStore.getItemAsync(key);

      if (existing) {
        router.replace('/home');
        return true; // Signup failed — user exists
      }

      const newUserData = {
        streak: 0,
        level: [0, 0, 0, 0, 0],
      };

      await SecureStore.setItemAsync(key, JSON.stringify(newUserData));

      // Update context with new user data
      setStreak(newUserData.streak);
      setLevel(newUserData.level);

      console.log('New user created successfully.');
      router.replace('/home');
      return true;
    } catch (err) {
      console.error('Error signing up user:', err);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        streak,
        setStreak,
        level,
        setLevel,
        loadUserData,
        saveUserData,
        signUpUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
