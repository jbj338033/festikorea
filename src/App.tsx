import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import MyReviewsPage from './pages/MyReviewsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/festival/:id" element={<FestivalDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/my-reviews" element={<MyReviewsPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
