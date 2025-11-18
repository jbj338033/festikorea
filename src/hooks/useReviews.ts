import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Review } from '../types/review';
import { useAuth } from '../contexts/AuthContext';

export function useReviews(festivalId?: string) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      let q;

      if (festivalId) {
        q = query(
          collection(db, 'reviews'),
          where('festivalId', '==', festivalId),
          orderBy('createdAt', 'desc')
        );
      } else if (user) {
        q = query(
          collection(db, 'reviews'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
      } else {
        setReviews([]);
        setLoading(false);
        return;
      }

      const snapshot = await getDocs(q);
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];

      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [festivalId, user]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const addReview = async (
    festivalId: string,
    festivalName: string,
    rating: number,
    content: string
  ) => {
    if (!user) throw new Error('로그인이 필요합니다.');

    await addDoc(collection(db, 'reviews'), {
      userId: user.uid,
      userEmail: user.email,
      festivalId,
      festivalName,
      rating,
      content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await loadReviews();
  };

  const updateReview = async (
    reviewId: string,
    rating: number,
    content: string
  ) => {
    if (!user) throw new Error('로그인이 필요합니다.');

    await updateDoc(doc(db, 'reviews', reviewId), {
      rating,
      content,
      updatedAt: serverTimestamp(),
    });

    await loadReviews();
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) throw new Error('로그인이 필요합니다.');

    await deleteDoc(doc(db, 'reviews', reviewId));
    await loadReviews();
  };

  return {
    reviews,
    loading,
    addReview,
    updateReview,
    deleteReview,
    refetch: loadReviews,
  };
}
