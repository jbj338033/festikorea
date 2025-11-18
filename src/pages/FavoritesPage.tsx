import { useTranslation } from 'react-i18next';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Loading from '../components/common/Loading';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { favorites, loading, removeFavorite } = useFavorites();

  const formatDate = (timestamp: { toDate: () => Date } | undefined) => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">
          {t('favorites.title')} <span className="text-gray-400">({favorites.length})</span>
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-6">{t('favorites.empty')}</p>
            <Link
              to="/"
              className="text-primary hover:text-primary-hover transition-colors font-medium"
            >
              {t('festival.browseMore')} →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="group">
                <Link to={`/festival/${favorite.festivalId}`}>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary transition-all mb-3">
                    <div className="aspect-[4/3] bg-gray-100">
                      {favorite.festivalImage ? (
                        <img
                          src={favorite.festivalImage}
                          alt={favorite.festivalName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                          {t('festival.noImage')}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {favorite.festivalName}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {formatDate(favorite.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => removeFavorite(favorite.id)}
                  className="w-full bg-white border border-red-200 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  {t('favorites.remove')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
