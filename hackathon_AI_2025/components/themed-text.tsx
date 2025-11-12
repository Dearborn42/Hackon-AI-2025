import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useSettings } from '@/components/settings-context';

interface ThemedTextProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ style, children }) => {
  const { settings } = useSettings();
  const color = settings.theme === 'light' ? '#1C1C1E' : '#FFFFFF';

  return <Text style={[styles.text, { color }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
