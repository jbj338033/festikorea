import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import StarRating from './StarRating';
import { useAuth } from '../../contexts/AuthContext';

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      onLoginRequired();
      return;
    }

    if (!content.trim()) {
      alert(t('review.commentRequired'));
      return;
    }

    setLoading(true);
    try {
      await onSubmit(rating, content);
      setRating(5);
      setContent('');
    } catch (error) {
      console.error('Review submit error:', error);
      alert(t('review.submitFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('review.writeComment')}</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('review.ratingLabel')}
        </label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('review.commentLabel')}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder={t('review.commentPlaceholder')}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
      >
        {loading ? t('review.submitting') : t('review.submitReview')}
      </button>
    </form>
  );
}
