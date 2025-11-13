import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';


import { useColorScheme } from '@/hooks/use-color-scheme';
import { SettingsProvider } from '@/components/settings-context';
import { UserContextProvider } from '@/components/user-context';

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

  return (
    <SettingsProvider>
      <UserContextProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="index" options={{ title: 'Signup'}} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </UserContextProvider>
    </SettingsProvider>
  );
}
