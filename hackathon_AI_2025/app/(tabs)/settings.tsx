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
  const textColor = isLight ? '#1C1C1E' : '#FFFFFF';
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
          minimumTrackTintColor={isLight ? '#000000' : '#FFFFFF'}
          maximumTrackTintColor={isLight ? '#AAAAAA' : '#444444'}
          thumbTintColor="#028090"
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
    backgroundColor: '#028090',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#025964',
  },
  text: {
    fontSize: 48,
    fontWeight: '700',
  },
  textBody: {
    fontSize: 24,
    fontWeight: '400',
    marginTop: 12,
    marginBottom: 6,
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
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
