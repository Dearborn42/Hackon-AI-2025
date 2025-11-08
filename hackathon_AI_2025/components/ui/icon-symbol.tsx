import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { ComponentProps } from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';
import { SymbolWeight } from 'expo-symbols';

type IconFamily = 'MaterialIcons' | 'Fontisto';

type IconMappingEntry = {
  family: IconFamily;
  name: string; // icon name in that family
};

const MAPPING: Record<string, IconMappingEntry> = {
  'house.fill': { family: 'MaterialIcons', name: 'home' },
  'paperplane.fill': { family: 'MaterialIcons', name: 'send' },
  'chevron.left.forwardslash.chevron.right': { family: 'MaterialIcons', name: 'code' },
  'chevron.right': { family: 'MaterialIcons', name: 'chevron-right' },
  'brain.fill': { family: 'MaterialIcons', name: 'psychology' },
  'calendar': { family: 'MaterialIcons', name: 'calendar-today' },
  'multitrack.audio.fill': { family: 'MaterialIcons', name: 'multitrack-audio' },
  'mad.face.fill': { family: 'Fontisto', name: 'mad' }, // Fontisto icon
  'settings': {family: 'Fontisto', name: 'player-settings'}
};

type IconSymbolProps = {
  name: keyof typeof MAPPING;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight; // unused here, but keep for API compatibility
};

export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  const icon = MAPPING[name];

  if (!icon) {
    // Fallback for unmapped icon names
    return null;
  }

  switch (icon.family) {
    case 'MaterialIcons':
      return <MaterialIcons name={icon.name as any} size={size} color={color} style={style} />;
    case 'Fontisto':
      return <Fontisto name={icon.name as any} size={size} color={color} style={style} />;
    default:
      return null;
  }
}
