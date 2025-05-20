// src/db.js
import { openDB } from 'idb';

const DB_NAME = 'DocumentDB';
const STORE_NAME = 'documents';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addDocument = async (doc) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  if (doc.id === null || doc.id === undefined) {
    delete doc.id;
  }

  doc.createdAt = Date.now(); // ✅ Thêm timestamp

  await store.add(doc);
  await tx.done;
};

export const getAllDocuments = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const allDocs = await store.getAll();

  // ✅ Sắp xếp mới nhất lên đầu
  return allDocs.sort((a, b) => b.createdAt - a.createdAt);
};

export const updateDocument = async (doc) => {
  const db = await initDB();
  await db.put(STORE_NAME, doc);
};

export const deleteDocument = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
