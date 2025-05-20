import { Layout, Button } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DocumentForm from './components/DocumentForm';
import DocumentsPage from './pages/DocumentsPage';
import { addDocument } from './db';
import MainLayout from './layouts/MainLayout.tsx';
import './App.css';

const { Content } = Layout;

function App() {
  const navigate = useNavigate(); // ✅ Bây giờ sẽ hoạt động vì App nằm trong <Router>

  const handleAdd = async (doc) => {
    await addDocument(doc);
  };

  const add = () => {
    navigate('/add');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainLayout>
        <Content>
          <div className="title-page">
            <h2>Quản lý khách sạn </h2>
            <Button type="primary" onClick={add}>Thêm khách sạn</Button>
          </div>
          <Routes>
            <Route
              path="/add"
              element={<DocumentForm onSubmit={handleAdd} initialValues={{}} />}
            />
            <Route path="/" element={<DocumentsPage />} />
          </Routes>
        </Content>
      </MainLayout>
    </Layout>
  );
}

export default App;
