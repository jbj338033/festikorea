import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import StarRating from './StarRating';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import Toast from '../common/Toast';

interface ReviewFormProps {
  festivalId: string;
  festivalName: string;
  onSubmit: (rating: number, content: string) => Promise<void>;
  onLoginRequired: () => void;
}

export default function ReviewForm({
  onSubmit,
  onLoginRequired,
}: ReviewFormProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      onLoginRequired();
      return;
    }

    if (!content.trim()) {
      showToast(t('review.commentRequired'), 'error');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(rating, content);
      setRating(5);
      setContent('');
      showToast(t('review.submitSuccess'), 'success');
    } catch (error) {
      console.error('Review submit error:', error);
      showToast(t('review.submitFailed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{t('review.writeComment')}</h3>

      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-400 mb-3">
          {t('review.ratingLabel')}
        </label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-400 mb-3">
          {t('review.commentLabel')}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder={t('review.commentPlaceholder')}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white px-6 py-3.5 rounded-xl font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? t('review.submitting') : t('review.submitReview')}
      </button>

      {toast.isVisible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </form>
  );
}
