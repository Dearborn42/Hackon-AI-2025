import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Text } from 'react-native';

export default function TabFiveScreen() {



  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.text}>Audio Game</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    height: "100%",

  },
  topBar: {
    height: 100,
    width: "100%",
    backgroundColor: "#028090",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#025964",
  },
  text: {
    color: "white",
    fontSize: 48,
    fontWeight: "700",
  },
  textBody: {
    color: "gray",
    fontSize: 24,
    fontWeight: "400",
  },
  icons: {
    color: "white",
    marginRight: 10,
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
