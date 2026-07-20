import { View, StyleSheet } from 'react-native';
import { Skeleton } from 'react-native-skeleton-kit';

export default function App() {
  return (
    <View style={styles.container}>
      <Skeleton width={200} height={20} style={styles.line} />
      <Skeleton width={160} height={20} style={styles.line} />
      <Skeleton width={60} height={60} borderRadius={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  line: {
    marginBottom: 4,
  },
});
