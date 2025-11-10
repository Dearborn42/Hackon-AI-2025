import { Image } from 'expo-image';
import { Platform, StyleSheet, View,Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.bgContainer}>
      <View style={styles.topBar}>

      </View>
      <Text style={styles.text}>Gurt</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    height:"100%",
    backgroundColor:"white",
  },
  text:{
    color:"black",
  },
  topBar:{
    height:90,
    width:"100%", 
    backgroundColor:"#1C6E8C",
  }
});
