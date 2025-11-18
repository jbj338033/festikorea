import { useTranslation } from 'react-i18next';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Loading from '../components/common/Loading';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { favorites, loading, removeFavorite } = useFavorites();

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('ko-KR');
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('favorites.title')}
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">{t('auth.loginRequired')}</p>
          <Link
            to="/"
            className="text-primary hover:underline"
          >
            {t('festival.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t('favorites.title')} ({favorites.length})
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">{t('favorites.empty')}</p>
          <Link
            to="/"
            className="text-primary hover:underline"
          >
            {t('festival.browseMore')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
            >
              <Link to={`/festival/${favorite.festivalId}`}>
                <div className="aspect-video bg-gray-200">
                  {favorite.festivalImage ? (
                    <img
                      src={favorite.festivalImage}
                      alt={favorite.festivalName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {t('festival.noImage')}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {favorite.festivalName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t('festival.addedDate')} {formatDate(favorite.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={() => removeFavorite(favorite.id)}
                  className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  {t('favorites.remove')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
