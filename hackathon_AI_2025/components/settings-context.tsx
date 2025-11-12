import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export interface Settings {
  voice: 'english' | 'african' | 'american' | 'indian';
  volume: number;
  theme: 'dark' | 'light'
}

interface SettingsContextValue {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  saveSetting: (key: keyof Settings, value: any) => Promise<void>;
  loaded: boolean;
}

const defaultContextValue: SettingsContextValue = {
  settings: { voice: 'english', volume: 50, theme: "dark" },
  setSettings: () => {},
  saveSetting: async () => {},
  loaded: false,
};

const SettingsContext = createContext<SettingsContextValue>(defaultContextValue);


async function saveToStorage(key: string, value: any) {
  const formattedData = JSON.stringify(value);
  if (Platform.OS === 'web') {
    localStorage.setItem(key, formattedData);
  } else {
    await SecureStore.setItemAsync(key, formattedData);
  }
}

async function getFromStorage(key: string) {
  let result: string | null = null;
  if (Platform.OS === 'web') {
    result = localStorage.getItem(key);
  } else {
    result = await SecureStore.getItemAsync(key);
  }

  if (result === null) return null;
  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
}



export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    voice: 'english',
    volume: 50,
    theme: 'light'

  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const newSettings = { ...settings };
      for (const key in newSettings) {
        const value = await getFromStorage(key);
        if (value !== null) {
          (newSettings as any)[key] = key === 'volume' ? Number(value) : value;
        }
      }
      setSettings(newSettings);
      setLoaded(true);
    })();
  }, []);

  const saveSetting = async (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    await saveToStorage(key, value);
  };

  useEffect(() => {
    if (loaded) {
      Object.entries(settings).forEach(([key, value]) => {
        saveToStorage(key, value);
      });
    }
  }, [settings, loaded]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, saveSetting, loaded }}>
      {children}
    </SettingsContext.Provider>
  );
};


export function useSettings() {
  return useContext(SettingsContext);
}
