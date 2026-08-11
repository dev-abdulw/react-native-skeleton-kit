import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Skeleton } from 'react-native-skeleton-kit';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Pulse</Text>
      <View style={styles.section}>
        <Skeleton
          width={200}
          height={20}
          animation="pulse"
          style={styles.line}
        />
        <Skeleton
          width={160}
          height={20}
          animation="pulse"
          style={styles.line}
        />
        <Skeleton width={60} height={60} borderRadius={30} animation="pulse" />
      </View>

      <Text style={styles.heading}>Shimmer</Text>
      <View style={styles.section}>
        <Skeleton
          width={200}
          height={20}
          animation="shimmer"
          style={styles.line}
        />
        <Skeleton
          width={160}
          height={20}
          animation="shimmer"
          style={styles.line}
        />
        <Skeleton
          width={60}
          height={60}
          borderRadius={30}
          animation="shimmer"
        />
      </View>

      <Text style={styles.heading}>None (static)</Text>
      <View style={styles.section}>
        <Skeleton
          width={200}
          height={20}
          animation="none"
          style={styles.line}
        />
        <Skeleton
          width={160}
          height={20}
          animation="none"
          style={styles.line}
        />
        <Skeleton width={60} height={60} borderRadius={30} animation="none" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  section: {
    alignItems: 'center',
    gap: 12,
  },
  line: {
    marginBottom: 4,
  },
});
