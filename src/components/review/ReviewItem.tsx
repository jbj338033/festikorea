import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Review } from '../../types/review';
import StarRating from './StarRating';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import Toast from '../common/Toast';

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
  const { toast, showToast, hideToast } = useToast();

  const isOwner = user?.uid === review.userId;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await onUpdate(review.id, editRating, editContent);
      setIsEditing(false);
      showToast(t('review.updateSuccess'), 'success');
    } catch {
      showToast(t('review.updateFailed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(review.id);
      showToast(t('review.deleteSuccess'), 'success');
    } catch {
      showToast(t('review.deleteFailed'), 'error');
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
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="mb-4">
          <StarRating rating={editRating} onRatingChange={setEditRating} />
        </div>
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={3}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white transition-all"
        />
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {loading ? t('review.saving') : t('common.save')}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            {t('common.cancel')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <StarRating rating={review.rating} readonly />
          <p className="text-xs text-gray-400 mt-2">
            {review.userEmail} · {formatDate(review.createdAt)}
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-gray-500 hover:text-primary transition-colors font-medium"
            >
              {t('common.edit')}
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50 font-medium"
            >
              {t('common.delete')}
            </button>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{review.content}</p>

      {toast.isVisible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
