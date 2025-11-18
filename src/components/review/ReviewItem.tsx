import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Review } from '../../types/review';
import StarRating from './StarRating';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewItemProps {
  review: Review;
  onUpdate: (reviewId: string, rating: number, content: string) => Promise<void>;
  onDelete: (reviewId: string) => Promise<void>;
}

export default function ReviewItem({ review, onUpdate, onDelete }: ReviewItemProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review.rating);
  const [editContent, setEditContent] = useState(review.content);
  const [loading, setLoading] = useState(false);

  const isOwner = user?.uid === review.userId;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await onUpdate(review.id, editRating, editContent);
      setIsEditing(false);
    } catch {
      alert(t('review.updateFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(t('review.deleteReallyConfirm'))) return;

    setLoading(true);
    try {
      await onDelete(review.id);
    } catch {
      alert(t('review.deleteFailed'));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: { toDate: () => Date } | undefined) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('ko-KR');
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="mb-3">
          <StarRating rating={editRating} onRatingChange={setEditRating} />
        </div>
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={3}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 mb-3 resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {loading ? t('review.saving') : t('common.save')}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {t('common.cancel')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <StarRating rating={review.rating} readonly />
          <p className="text-sm text-gray-600 mt-1">
            {review.userEmail} · {formatDate(review.createdAt)}
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              {t('common.edit')}
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-sm text-red-600 hover:underline disabled:opacity-50"
            >
              {t('common.delete')}
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-800 whitespace-pre-wrap">{review.content}</p>
    </div>
  );
}
