// src/components/DocumentForm.js
import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const DocumentForm = ({ onSubmit, initialValues = {}, isEditing }) => {
  const [fileData, setFileData] = useState(null);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileData(e.target.result);
    };
    reader.readAsDataURL(file);
    return false; // prevent auto-upload
  };

  const onFinish = (values) => {
    onSubmit({
      ...values,
      image: fileData || initialValues.image || null,
      id: initialValues.id,
    });
  };

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Form.Item name="title" label="Tiêu đề 1" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Upload beforeUpload={handleUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
        {(initialValues?.image || fileData) && (
            <img
                src={fileData || initialValues?.image}
                alt="preview"
                style={{ marginTop: 10, maxHeight: 100 }}
            />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditing ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DocumentForm;
