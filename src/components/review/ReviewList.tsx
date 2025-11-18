import { useTranslation } from 'react-i18next';
import type { Review } from '../../types/review';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  reviews: Review[];
  onUpdate: (reviewId: string, rating: number, content: string) => Promise<void>;
  onDelete: (reviewId: string) => Promise<void>;
}

export default function ReviewList({ reviews, onUpdate, onDelete }: ReviewListProps) {
  const { t } = useTranslation();

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('review.noReviewsYet')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
