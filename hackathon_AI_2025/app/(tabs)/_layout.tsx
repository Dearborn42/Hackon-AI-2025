import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View,Text } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconSize = 24;
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
        tabBarActiveTintColor: "#1C6E8C",
        tabBarInactiveTintColor:"#a6a6a6",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle:{
          backgroundColor:"white",
          outline:"none",
          borderColor:"#d9d9d9",
          borderTopWidth:2,
          height:80,
          justifyContent:"center",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => 
            <View style={styles.buttonContainer}>
              <FontAwesome6 name="house-chimney" size={iconSize} style={styles.icons} />
              <Text style={styles.iconText}>Home</Text>
            </View>
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
    </Tabs>
  );
}
const styles = StyleSheet.create({
  icons:{
    color:"#1C6E8C",
  },
  iconText:{
    color:"#1C6E8C",
    fontSize:16,
    fontWeight:"700",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
