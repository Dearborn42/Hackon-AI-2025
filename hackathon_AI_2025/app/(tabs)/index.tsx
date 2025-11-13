import {StyleSheet, View,Text,Image } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { UserContext } from '@/components/user-context';
import { useContext } from 'react';

export default function HomeScreen() {
  const { streak, level, setLevel, setStreak } = useContext(UserContext);
  const iconSize = 80;
  return (
    <ThemedView style={styles.bgContainer}>
      <View style={styles.topBar}>
        {/* <FontAwesome6 name="fire" size={iconSize} style={styles.icons} /> */}
        <Image source={require('../../assets/images/Fire.png')} style={[styles.icons,{ width: iconSize, height: iconSize }]} />
        <Text style={styles.textHeader}>67</Text>
        <Image source={require('../../assets/images/Level.png')} style={[styles.icons,{ width: iconSize, height: iconSize }]}/>
        <Text style={styles.textHeader}>67</Text>
      </View>
      <View style={styles.bgContainer}>
        <Text style={styles.text1}>Welcome to NeuroArcade!</Text>
        <Text style={styles.text}>Click the games on the bottom tab to start learning!</Text>

      </View>
      <Text style={{}}></Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
   text1:{
    fontFamily:"Font",
    fontSize:36,
    color:"#007db3",
    marginBottom:20,
    textAlign:"center",
  },
  text:{
    fontFamily:"Font",
    fontSize:28,
    color:"#007db3",
    marginBottom:20,
    textAlign:"center",
  },
  bgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  },
  topBar:{
    height:100,
    width:"100%", 
    backgroundColor:"#0099db",
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:10,
    borderBottomWidth:2,
    borderBottomColor:"#007db3",
    justifyContent:"flex-start"
  },
  textHeader:{
    color:"white",
    fontSize:48,
    fontFamily:"Font",
    marginLeft:10,
  },

  icons:{
    marginLeft:10,
    marginRight:10,

  }
  
});
