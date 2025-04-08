import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setItems, deleteItem } from '../redux/actions';
import { initDB, getItemsFromDB, deleteItemFromDB } from '../db/dbService';
import EmptyState from '../components/EmptyState';
import { getUnsyncedItems, markItemAsSynced } from '../db/dbService';

const ItemListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(state => state.itemsState.items);

  useEffect(() => {
    const loadItems = async () => {
      await initDB();
      const data = await getItemsFromDB();
      dispatch(setItems(data));
    };
    const unsubscribe = navigation.addListener('focus', loadItems);
    return unsubscribe;
  }, [navigation, dispatch]);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteItemFromDB(id);
            dispatch(deleteItem(id));
          },
        },
      ]
    );
  };

  const syncToServer = async () => {
    const unsyncedItems = await getUnsyncedItems();
    console.log('unsynsced items;;:', unsyncedItems)
    if (unsyncedItems.length === 0) {
      alert('All items are already synced!');
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(res => setTimeout(res, 1500));

      // Fake "sending" to server
      console.log('Syncing items to server:', unsyncedItems);

      // After "success", mark them as synced
      for (const item of unsyncedItems) {
        await markItemAsSynced(item.id);
      }

      alert('Sync complete! ✅');
    } catch (err) {
      alert('Sync failed 😓');
      console.error(err);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate('AddEditItem', { item })}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.syncButton} onPress={syncToServer}>
        <Text style={styles.syncText}>🔄 Sync</Text>
      </TouchableOpacity>
      <FlatList
        data={[...items].reverse()}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState items={items} />}
      />
      {items.length > 0 && <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditItem')}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>}
      
    </View>
  );
};

export default ItemListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: 'lightgray',
    marginBottom: 10,
    borderRadius: 8,
  },

  delete: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#1e90ff',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 28,
    color: '#fff',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fce4e4',
    marginLeft: 10,
  },
  deleteIcon: {
    fontSize: 18,
    color: '#d9534f',
  },
  syncButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  syncText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
