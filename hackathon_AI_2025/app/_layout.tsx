import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import{ Text } from 'react-native';
import React from 'react';


import { useColorScheme } from '@/hooks/use-color-scheme';
import { SettingsProvider } from '@/components/settings-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    'Font': require('../assets/fonts/MinecraftStandard.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  const TextAny = Text as any;
  const oldTextRender = TextAny.render;
  TextAny.render = function (...args:any[]) {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: 'Font' }, origin.props.style],
    });
  };

  return (
    <SettingsProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SettingsProvider>
  );
}
