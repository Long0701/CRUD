import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { addDocument, updateDocument } from '../db';
import { cityOptions, rateOptions } from '../constants/cities';
import './DocumentForm.css';

const DocumentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { initialValues = {}, isEditing = false } = location.state || {};
  const [fileData, setFileData] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setFileData(e.target.result);
    reader.readAsDataURL(file);
    return false; // prevent auto upload
  };

  const onFinish = async (values) => {
    const selectedImage = fileData || initialValues.image;

    if (!selectedImage) {
      message.error('Vui lòng chọn ảnh');
      return;
    }

    const data = {
      ...values,
      image: selectedImage,
      id: initialValues.id,
    };

    try {
      if (isEditing) {
        await updateDocument(data);
        message.success('Đã cập nhật văn bản');
      } else {
        await addDocument(data);
        message.success('Đã thêm mới văn bản');
      }
      navigate('/');
    } catch (err) {
      message.error('Có lỗi xảy ra');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      className="document-form"
    >
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="city" label="Thành phố" rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}>
        <Select placeholder="Chọn thành phố" options={cityOptions} />
      </Form.Item>
      <Form.Item name="rate" label="Đánh giá" rules={[{ required: true, message: 'Vui lòng chọn đánh giá' }]}>
        <Select placeholder="Chọn" options={rateOptions} />
      </Form.Item>
      <Form.Item
        name="image"
        label="Hình ảnh"
        rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
      >
        <Upload
          beforeUpload={handleUpload}
          showUploadList={false}
          customRequest={({ onSuccess }) => onSuccess("ok")}
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
        {(fileData || initialValues.image) && (
          <img
            src={fileData || initialValues.image}
            alt="preview"
            style={{ marginTop: 10, maxHeight: 100, display: 'block' }}
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
