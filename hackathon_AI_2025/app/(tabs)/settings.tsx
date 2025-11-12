import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';
import { useSettings } from '../../components/settings-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function TabSixScreen() {
  const { settings, saveSetting } = useSettings();

  const isLight = settings.theme === 'light';
  const bgColor = isLight ? '#FFFFFF' : '#1C1C1E';
  const textColor = isLight ? '#0099db' : '#0099db';
  const borderColor = isLight ? '#CCCCCC' : '#444444';
  const dropdownBg = isLight ? '#F5F5F5' : '#2C2C2E';
  const placeholderColor = isLight ? '#666666' : '#AAAAAA';

  return (
    <ThemedView style={styles.bgContainer}>
      <View style={styles.topBar}>
        <ThemedText style={[styles.text, { color: 'white' }]}>Settings</ThemedText>
      </View>

      <View style={[styles.innerContainer]}>
        <ThemedText style={[styles.textBody, { color: textColor }]}>Voice</ThemedText>
        <Dropdown
          data={[
            { label: "English", value: "english" },
            { label: "African", value: "african" },
            { label: "Indian", value: "indian" },
            { label: "American", value: "american" },
          ]}
          value={settings.voice}
          style={[
            styles.dropdown,
            { backgroundColor: dropdownBg, borderColor: borderColor },
          ]}
          placeholderStyle={[styles.placeholderStyle, { color: placeholderColor }]}
          selectedTextStyle={[styles.selectedTextStyle, { color: textColor }]}
          inputSearchStyle={[styles.inputSearchStyle, { color: textColor }]}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Voice"
          searchPlaceholder="Search..."
          onChange={item => saveSetting('voice', item.value)}
        />

        <ThemedText style={[styles.textBody, { color: textColor }]}>Theme</ThemedText>
        <Dropdown
          data={[
            { label: "Dark", value: "dark" },
            { label: "Light", value: "light" },
          ]}
          value={settings.theme}
          style={[
            styles.dropdown,
            { backgroundColor: dropdownBg, borderColor: borderColor },
          ]}
          placeholderStyle={[styles.placeholderStyle, { color: placeholderColor }]}
          selectedTextStyle={[styles.selectedTextStyle, { color: textColor }]}
          inputSearchStyle={[styles.inputSearchStyle, { color: textColor }]}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Theme"
          searchPlaceholder="Search..."
          onChange={item => saveSetting('theme', item.value)}
        />

        <ThemedText style={[styles.textBody, { color: textColor }]}>Game Volume</ThemedText>
        <Slider
          value={settings.volume}
          onValueChange={value => saveSetting('volume', Math.ceil(value))}
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={isLight ? '#0099db' : '#0099db'}
          maximumTrackTintColor={isLight ? '#AAAAAA' : '#444444'}
          thumbTintColor="#0099db"
        />
        <ThemedText style={{ color: textColor }}>{settings.volume}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    height: '100%',
  },
  innerContainer: {
    padding: 16,
  },
  topBar: {
    height: 100,
    width: '100%',
    backgroundColor: '#0099db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#007db3',
  },
  text: {
    fontSize: 48,
    fontFamily:"Font",
    color: '#0099db',

  },
  textBody: {
    fontSize: 24,
    marginTop: 12,
    fontFamily:"Font",
    marginBottom: 6,
    color: '#0099db',

  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    fontFamily:"Font",
    color: '#0099db',

  },
  placeholderStyle: {
    fontFamily:"Font",
    fontSize: 16,
    color: '#0099db',

  },
  selectedTextStyle: {
    fontFamily:"Font",
    fontSize: 16,
    color: '#0099db',

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontFamily:"Font",
    color: '#0099db',
    fontSize: 16,
  },
});
