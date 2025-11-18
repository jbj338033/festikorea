import { useTranslation } from 'react-i18next';
import { useReviews } from '../hooks/useReviews';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Loading from '../components/common/Loading';
import ReviewList from '../components/review/ReviewList';

export default function MyReviewsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { reviews, loading, updateReview, deleteReview } = useReviews();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('review.myReviews')}
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t('review.myReviews')} ({reviews.length})
      </h1>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">{t('review.noReviews')}</p>
          <Link
            to="/"
            className="text-primary hover:underline"
          >
            {t('festival.browseMore')}
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
              <Link
                to={`/festival/${review.festivalId}`}
                className="text-xl font-bold text-primary hover:underline mb-4 block"
              >
                {review.festivalName}
              </Link>
              <ReviewList
                reviews={[review]}
                onUpdate={updateReview}
                onDelete={deleteReview}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
