import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmptyState = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerAction} />
          </View>

        </View>

        <View style={styles.empty}>
          <View style={styles.fake}>
            <View style={styles.fakeCircle} />

            <View>
              <View style={[styles.fakeLine, { width: 120 }]} />

              <View style={styles.fakeLine} />

              <View
                style={[
                  styles.fakeLine,
                  { width: 70, marginBottom: 0 },
                ]} />
            </View>
          </View>

          <View style={[styles.fake, { opacity: 0.5 }]}>
            <View style={styles.fakeCircle} />

            <View>
              <View style={[styles.fakeLine, { width: 120 }]} />

              <View style={styles.fakeLine} />

              <View
                style={[
                  styles.fakeLine,
                  { width: 70, marginBottom: 0 },
                ]} />
            </View>
          </View>

          <Text style={styles.emptyTitle}>No items available</Text>

          <Text style={styles.emptyDescription}>
          Add a new item using the + button to get started.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddEditItem')}>
          <View style={styles.btn}>
              <Text style={styles.btnText}>Start Adding Items</Text>
              <Text style={[styles.btnText]}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  /** Empty */
  empty: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#8c9197',
    textAlign: 'center',
  },
  /** Fake */
  fake: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  fakeCircle: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: '#e8e9ed',
    marginRight: 16,
  },
  fakeLine: {
    width: 200,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#e8e9ed',
    marginBottom: 8,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
    marginTop: 'auto',
    marginHorizontal: 24,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});