import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'ItemsDB.db';
const database_version = '1.0';
const database_displayname = 'SQLite Items DB';
const database_size = 200000;

let db;

export const initDB = async () => {
  db = await SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    synced INTEGER DEFAULT 0
  );

  `);
  return db;
};

export const getItemsFromDB = async () => {
  const [results] = await db.executeSql('SELECT * FROM items');
  const items = [];
  for (let i = 0; i < results.rows.length; i++) {
    items.push(results.rows.item(i));
  }
  return items;
};

export const insertItem = async (item) => {
  const result = await db.executeSql(
    'INSERT INTO items (name, description, synced) VALUES (?, ?, 0)',
    [item.name, item.description]
  );
  const insertId = result[0].insertId;
  return { id: insertId, ...item };
};

export const updateItemInDB = async (item) => {
  await db.executeSql(
    'UPDATE items SET name = ?, description = ?, synced = 0 WHERE id = ?',
    [item.name, item.description, item.id]
  );
  return item;
};

export const deleteItemFromDB = async (id) => {
  await db.executeSql('DELETE FROM items WHERE id = ?', [id]);
};

export const getUnsyncedItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items WHERE synced = 0',
        [],
        (_, result) => {
          const items = result.rows._array || [];
          resolve(items);
        },
        (_, error) => {
          console.error('Error fetching unsynced items:', error);
          reject(error);
        }
      );
    });
  });
};

export const markItemAsSynced = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE items SET synced = 1 WHERE id = ?',
        [id],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};