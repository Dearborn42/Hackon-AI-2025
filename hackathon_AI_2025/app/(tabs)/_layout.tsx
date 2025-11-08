import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AntDesign, FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <AntDesign name="home" size={16} color="white" />,
        }}
      />
      <Tabs.Screen
        name="memory"
        options={{
          title: 'Memory',
          tabBarIcon: () => <FontAwesome5 name="brain" size={16} color="white" />,
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: () => <FontAwesome5 name="calendar-alt" size={16} color="white" />,
        }}
      />
      <Tabs.Screen
        name="audio"
        options={{
          title: 'Audio',
          tabBarIcon: () => <MaterialIcons name="multitrack-audio" size={16} color="white" />,
        }}
      />
      <Tabs.Screen
        name="self-control"
        options={{
          title: 'Self-Control',
          tabBarIcon: () => <Ionicons name="happy-outline" size={16} color="white" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <AntDesign name="setting" size={16} color="white" />,
        }}
      />
    </Tabs>
  );
}
