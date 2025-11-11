import { StyleSheet, View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Dropdown } from "react-native-element-dropdown"
import Slider from '@react-native-community/slider';

export interface Settings {
  voice: "english" | "african" | "american" | "indian",
  volume: number,
}

async function save(key: string, value: any) {
  const formattedData = JSON.stringify(value)
  if (Platform.OS == "web") {
    localStorage.setItem(key, formattedData);
  } else {
    await SecureStore.setItemAsync(key, formattedData);

  }
}

async function getValue(key: string) {
  let result: string | null = null;

  if (Platform.OS === 'web') { // check if on web
    result = localStorage.getItem(key);
  } else {
    result = await SecureStore.getItemAsync(key);
  }

  if (result === null) return null;
  try {
    return JSON.parse(result);
  } catch (e) {
    return result;
  }
}

export default function TabSixScreen() {
  const [settings, setSettings] = useState<Settings>({
    voice: 'english',
    volume: 50 // default settings
  });

  useEffect(() => { // load settings from local storage if no data then keep defaults
    const loadSettings = async () => {
      const newSettings = { ...settings };

      for (const key in newSettings) {

        const newValue = await getValue(key)

        if (newValue !== null) {
          if (key == "volume") {
             (newSettings as any)[key] = Number(newValue)
          } else {
            (newSettings as any)[key] = newValue
          }
        
        }
      }



      setSettings(newSettings);
    };

    loadSettings();
  }, []);

  return (
    <View style={styles.bgContainer}>
      {}
      <View style={styles.topBar}>
        <Text style={styles.text}>Settings</Text>
      </View>

      {}
      <View style={styles.bgContainer}>
        <Text style={styles.textBody}>Voice</Text>
        <Dropdown
          data={[
            { label: "English", value: "english" },
            { label: "African", value: "african" },
            { label: "Indian", value: "indian" },
            { label: "American", value: "american" }
          ]}
          value={settings.voice}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          onChange={item => {
            setSettings({ ...settings, voice: item.value });
            save("voice", item.value);
          }}
        />

        <Text style={styles.textBody}>Game Volume</Text>
        <Slider
          value={settings.volume}
          onValueChange={item => {
            setSettings({ ...settings, volume: Math.ceil(item) });
            save("volume", Math.ceil(item));
          }}
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          thumbTintColor='#028090'
        />
        <Text>{settings.volume}</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  bgContainer: {
    height: "100%",
    backgroundColor: "white"
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
