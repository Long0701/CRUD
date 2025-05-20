import React, { useState } from 'react';
import { List, Button, Image, Space, Card, Popconfirm, Input } from 'antd';
import './DocumentList.css';

const DocumentList = ({ documents, onEdit, onDelete }) => {
  const [searchText, setSearchText] = useState('');

  const filteredDocs = documents.filter((doc) =>
    doc.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    doc.content?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Input.Search
        placeholder="Tìm kiếm theo tiêu đề hoặc địa chỉ..."
        allowClear
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={filteredDocs}
        locale={{ emptyText: 'Không có dữ liệu phù hợp' }}
        renderItem={(doc) => (
          <List.Item>
            <Card className="document-card" bordered>
              <div className="document-content">
                {doc.image && (
                  <div className="document-image">
                    <Image
                      src={doc.image}
                      style={{ width: '100%', height: 150, objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="document-text">
                  <h3>{doc.title}</h3>
                  <p>{doc.content}</p>
                </div>
                <Space>
                  <Button type="primary" onClick={() => onEdit(doc)}>Sửa</Button>
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xoá?"
                    onConfirm={() => onDelete(doc.id)}
                    okText="Xoá"
                    cancelText="Hủy"
                  >
                    <Button danger>Xoá</Button>
                  </Popconfirm>
                </Space>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DocumentList;
