import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useSettings } from '@/components/settings-context';

interface ThemedViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ style, children }) => {
  const { settings } = useSettings();
  const backgroundColor = settings.theme === 'light' ? '#FFFFFF' : '#1C1C1E';
  
  return <View style={[styles.container, { backgroundColor }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
   
  },
});
