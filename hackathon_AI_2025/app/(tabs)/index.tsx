
import { Platform, StyleSheet, View,Text,Image } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
    const iconSize = 48;
  return (
    <ThemedView style={styles.bgContainer}>
      <View style={styles.topBar}>
        <FontAwesome6 name="fire" size={iconSize} style={styles.icons} />
        {/* <Image source={require('../../assets/images/Fire.png')} style={{ width: iconSize, height: iconSize}}/> */}
        <Text style={styles.textHeader}>67</Text>
      </View>
      <View style={styles.topBar}>
        <Text style={styles.textHeader}>Welcome to NeuroArcade!</Text>
      </View>
      <Text style={{}}></Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    height:"100%",
    
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
  textHeader:{
    color:"white",
    fontSize:48,
    fontWeight:"700",
  },
  icons:{
    color:"white",
    marginRight:10,
  }
  
});
