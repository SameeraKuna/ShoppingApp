import { Pressable, Text, StyleSheet } from 'react-native';
import { CoveColors } from '@/constants/theme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'default' | 'filled' | 'outline';
}

const createStyles = () =>
  StyleSheet.create({
    base: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
    },
  });

const styles = createStyles();

export function Chip({ label, selected = false, onPress, variant = 'default' }: ChipProps) {
  const getChipStyle = () => {
    const base = { ...styles.base };

    if (variant === 'filled') {
      return {
        ...base,
        backgroundColor: selected ? CoveColors.primary : '#F5F5F5',
      };
    }
    if (variant === 'outline') {
      return {
        ...base,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: selected ? CoveColors.primary : CoveColors.border,
      };
    }

    return {
      ...base,
      backgroundColor: selected ? CoveColors.primaryLight : '#F5F5F5',
    };
  };

  const getTextColor = () => {
    if (variant === 'filled') {
      return selected ? '#FFFFFF' : CoveColors.textPrimary;
    }
    if (variant === 'outline') {
      return selected ? CoveColors.primary : CoveColors.textSecondary;
    }
    return selected ? CoveColors.primary : CoveColors.textSecondary;
  };

  return (
    <Pressable style={getChipStyle()} onPress={onPress}>
      <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
    </Pressable>
  );
}
