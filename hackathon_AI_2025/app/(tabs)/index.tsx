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
      <Text style={{}}>
        {}
      </Text>
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
