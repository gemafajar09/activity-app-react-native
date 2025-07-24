import { View, Text, StyleSheet } from 'react-native';

export default function BeritaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Berita Screen</Text>
      <Text>Latest news and updates appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
