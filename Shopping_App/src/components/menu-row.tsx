import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CoveColors } from '@/constants/theme';

interface MenuRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: CoveColors.border,
    gap: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: CoveColors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: CoveColors.textSecondary,
    marginTop: 2,
  },
});

export function MenuRow({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
}: MenuRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Ionicons name={icon as any} size={24} color={CoveColors.primary} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color={CoveColors.textSecondary} />
      )}
    </Pressable>
  );
}
