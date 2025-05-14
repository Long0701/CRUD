// src/components/DocumentList.js
import React from 'react';
import { List, Button, Image } from 'antd';

const DocumentList = ({ documents, onEdit, onDelete }) => (
  <List
    itemLayout="vertical"
    dataSource={documents}
    renderItem={(doc) => (
      <List.Item
        key={doc.id}
        actions={[
          <Button onClick={() => onEdit(doc)}>Sửa</Button>,
          <Button danger onClick={() => onDelete(doc.id)}>Xoá</Button>,
        ]}
      >
        <List.Item.Meta title={doc.title} description={doc.content} />
        {doc.image && <Image src={doc.image} width={100} />}
      </List.Item>
    )}
  />
);

export default DocumentList;
