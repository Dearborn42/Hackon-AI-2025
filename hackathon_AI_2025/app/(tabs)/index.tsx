import { Image } from 'expo-image';
import { Platform, StyleSheet, View,Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
    const iconSize = 48;
  return (
    <View style={styles.bgContainer}>
      <View style={styles.topBar}>
        <FontAwesome6 name="fire" size={iconSize} style={styles.icons} />
        <Text style={styles.text}>67</Text>
      </View>
      <View style={styles.topBar}>
        <Text style={styles.text}>Welcome to duolingo</Text>
      </View>
      <Text style={styles.text}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    height:"100%",
    backgroundColor:"white",
  },
  topBar:{
    height:100,
    width:"100%", 
    backgroundColor:"#028090",
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:10,
    borderBottomWidth:2,
    borderBottomColor:"#025964",
  },
  text:{
    color:"white",
    fontSize:48,
    fontWeight:"700",
  },
  icons:{
    color:"white",
    marginRight:10,
  }
  
});
