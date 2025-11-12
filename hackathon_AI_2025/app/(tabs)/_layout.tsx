import { Tabs } from 'expo-router';
import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '@/components/settings-context';

function CustomTabButton({ children, onPress }: BottomTabBarButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
    >
      {children}
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconSize = 24;

  const { settings } = useSettings();

  const theme = settings.theme === 'light' ? '#FFFFFF' : '#1C1C1E';
  return (
    // <Drawer
    //   screenOptions={{ drawerActiveTintColor: 'blue', headerShown: false }}>
    //   <Drawer.Screen
    //     name="index" // This is the name of the page and must match the url from root
    //     options={{
    //       title: 'Home',
    //       headerShown: false,
    //       drawerIcon: () => <Text><Entypo name="share" size={24} color="black" /></Text>,
    //     }}
    //   />
    // </Drawer>




      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#028090",
          tabBarInactiveTintColor: "#a6a6a6",

          headerShown: false,

          tabBarStyle: {
            backgroundColor: theme,
            outline: "none",
            borderColor: "#d9d9d9",
            borderTopWidth: 2,
            height: 80,
          },
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarLabelStyle: {
            margin: 0,
            fontSize: 12,
            fontWeight: "600",
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: () =>
              <FontAwesome6 name="house-chimney" size={iconSize} style={styles.icons} />
          }}
        />
        <Tabs.Screen
          name="memory"
          options={{
            title: 'Memory',
            tabBarIcon: () => <FontAwesome6 name="brain" size={iconSize} style={styles.icons} />,
          }}
        />
        <Tabs.Screen
          name="planning"
          options={{
            title: 'Planning',
            tabBarIcon: () => <FontAwesome6 name="calendar-check" size={iconSize} style={styles.icons} />,
          }}
        />
        <Tabs.Screen
          name="audio"
          options={{
            title: 'Audio',
            tabBarIcon: () => <MaterialIcons name="multitrack-audio" size={iconSize} style={styles.icons} />,
          }}
        />
        <Tabs.Screen
          name="self-control"
          options={{
            title: 'Self-Control',
            tabBarIcon: () => <FontAwesome6 name="face-laugh-beam" size={iconSize} style={styles.icons} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: () => <FontAwesome6 name="gear" size={iconSize} style={styles.icons} />,
          }}
        />
        <Tabs.Screen
          name="visual"
          options={{
            title: 'Visual',
            tabBarIcon: () => <FontAwesome6 name="eye" size={iconSize} style={styles.icons} />,
          }}
        />
      </Tabs>



  );
}
const styles = StyleSheet.create({
  icons: {
    color: "#028090",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
