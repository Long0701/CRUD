// src/pages/DocumentsPage.js
import { useEffect, useState } from 'react';
import { message } from 'antd';
import DocumentList from '../components/DocumentList';
import {
  getAllDocuments,
  deleteDocument,
} from '../db';
import { useNavigate } from 'react-router-dom';

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
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
