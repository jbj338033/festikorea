import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Festival } from '../types/festival';
import { fetchFestivalById } from '../services/festivalApi';
import { useReviews } from '../hooks/useReviews';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import FavoriteButton from '../components/festival/FavoriteButton';
import ReviewForm from '../components/review/ReviewForm';
import ReviewList from '../components/review/ReviewList';
import Modal from '../components/common/Modal';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export default function FestivalDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [festival, setFestival] = useState<Festival | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const { reviews, loading: reviewsLoading, addReview, updateReview, deleteReview } = useReviews(id);

  const loadFestival = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchFestivalById(id);
      setFestival(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('festival.unknownError'));
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    loadFestival();
  }, [loadFestival]);

  const formatDate = (date: string) => {
    if (!date || date.length !== 8) return '';
    return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
  };

  const handleReviewSubmit = async (rating: number, content: string) => {
    if (!id || !festival) return;
    await addReview(id, festival.title, rating, content);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={loadFestival} />;
  if (!festival) return <ErrorMessage message={t('festival.notFound')} />;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-8">
            {festival.firstimage && (
              <div className="aspect-[21/9] bg-gray-100">
                <img
                  src={festival.firstimage}
                  alt={festival.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8 sm:p-10">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {festival.title}
                </h1>
                <FavoriteButton
                  festivalId={festival.contentid}
                  festivalName={festival.title}
                  festivalImage={festival.firstimage}
                  onLoginRequired={() => setShowAuthModal(true)}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-2">{t('festival.festivalPeriod')}</h3>
                  <p className="text-base text-gray-900">
                    {formatDate(festival.eventstartdate)} ~ {formatDate(festival.eventenddate)}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-2">{t('festival.venue')}</h3>
                  <p className="text-base text-gray-900">{festival.addr1}</p>
                  {festival.addr2 && <p className="text-sm text-gray-500 mt-1">{festival.addr2}</p>}
                </div>

                {festival.tel && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 mb-2">{t('festival.inquiry')}</h3>
                    <p className="text-base text-gray-900">{festival.tel}</p>
                  </div>
                )}

                {festival.overview && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 mb-2">{t('festival.introduction')}</h3>
                    <div
                      className="text-sm text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: festival.overview }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <ReviewForm
              festivalId={festival.contentid}
              festivalName={festival.title}
              onSubmit={handleReviewSubmit}
              onLoginRequired={() => setShowAuthModal(true)}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('review.title')} <span className="text-gray-400">({reviews.length})</span>
            </h2>
            {reviewsLoading ? (
              <Loading />
            ) : (
              <ReviewList
                reviews={reviews}
                onUpdate={updateReview}
                onDelete={deleteReview}
              />
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title={authMode === 'login' ? t('auth.loginTitle') : t('auth.signupTitle')}
      >
        {authMode === 'login' ? (
          <LoginForm
            onSuccess={() => setShowAuthModal(false)}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        ) : (
          <SignupForm
            onSuccess={() => setShowAuthModal(false)}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </Modal>
    </>
  );
}
