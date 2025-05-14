// src/App.js
import React, { useEffect, useState } from 'react';
import { Layout, Typography, Divider, message } from 'antd';
import DocumentForm from './components/DocumentForm';
import DocumentList from './components/DocumentList';
import {
  addDocument,
  getAllDocuments,
  deleteDocument,
  updateDocument,
} from './db';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [documents, setDocuments] = useState([]);
  const [editingDoc, setEditingDoc] = useState(null);

  const loadDocs = async () => {
    const docs = await getAllDocuments();
    setDocuments(docs);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleAddOrUpdate = async (doc) => {
    if (doc.id) {
      await updateDocument(doc);
      message.success('Đã cập nhật văn bản');
    } else {
      await addDocument(doc);
      message.success('Đã thêm mới văn bản');
    }
    setEditingDoc(null);
    await loadDocs();
  };

  const handleDelete = async (id) => {
    await deleteDocument(id);
    message.success('Đã xoá');
    await loadDocs();
  };

  return (
    <Layout style={{ minHeight: '100vh', padding: 20 }}>
      <Header style={{ backgroundColor: '#fff' }}>
        <Title level={2}>Quản lý Văn bản & Hình ảnh</Title>
      </Header>
      <Content>
      <DocumentForm
        onSubmit={handleAddOrUpdate}
        initialValues={editingDoc || {}}
        isEditing={!!editingDoc}
      />
        <Divider />
        <DocumentList
          documents={documents}
          onEdit={(doc) => setEditingDoc(doc)}
          onDelete={handleDelete}
        />
      </Content>
    </Layout>
  );
}

export default App;
