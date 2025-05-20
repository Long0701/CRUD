// src/pages/DocumentsPage.js
import React, { useEffect, useState } from 'react';
import { Divider, message, Typography } from 'antd';
import DocumentList from '../components/DocumentList';
import {
  getAllDocuments,
  deleteDocument,
  updateDocument,
} from '../db';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [editingDoc, setEditingDoc] = useState(null);
  const navigate = useNavigate(); // ✅ Thêm hook navigate

  const loadDocs = async () => {
    const docs = await getAllDocuments();
    setDocuments(docs);
  };

  useEffect(() => {
    loadDocs();
  }, []);

//   const handleUpdate = async (doc) => {
//     await updateDocument(doc);
//     message.success('Đã cập nhật văn bản');
//     setEditingDoc(null);
//     await loadDocs();
//   };

    const handleEdit = (doc) => {
        navigate('/add', {
        state: {
            initialValues: doc,
            isEditing: true,
        }
        });
    };

  const handleDelete = async (id) => {
    await deleteDocument(id);
    message.success('Đã xoá');
    await loadDocs();
  };

  return (
    <div style={{ padding: 20 }}>
      <DocumentList
        documents={documents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default DocumentsPage;
