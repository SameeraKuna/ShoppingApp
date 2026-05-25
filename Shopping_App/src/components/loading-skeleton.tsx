import { View, StyleSheet } from 'react-native';
import { CoveColors } from '@/constants/theme';

export function ProductCardSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.space} />
      <View style={styles.line} />
      <View style={styles.lineSmall} />
      <View style={styles.space} />
      <View style={styles.lineSmall} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 16,
  },
  image: {
    aspectRatio: 1,
    backgroundColor: CoveColors.border,
    borderRadius: 8,
    marginBottom: 8,
  },
  space: {
    height: 4,
  },
  line: {
    height: 12,
    backgroundColor: CoveColors.border,
    borderRadius: 4,
  },
  lineSmall: {
    height: 10,
    backgroundColor: CoveColors.border,
    borderRadius: 4,
    width: '70%',
  },
});
