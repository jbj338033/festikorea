import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Favorite } from '../types/favorite';
import { useAuth } from '../contexts/AuthContext';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Favorite[];
      setFavorites(favs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addFavorite = async (
    festivalId: string,
    festivalName: string,
    festivalImage?: string
  ) => {
    if (!user) throw new Error('로그인이 필요합니다.');

    await addDoc(collection(db, 'favorites'), {
      userId: user.uid,
      festivalId,
      festivalName,
      festivalImage: festivalImage || null,
      createdAt: serverTimestamp(),
    });
  };

  const removeFavorite = async (favoriteId: string) => {
    await deleteDoc(doc(db, 'favorites', favoriteId));
  };

  const isFavorite = (festivalId: string): boolean => {
    return favorites.some((fav) => fav.festivalId === festivalId);
  };

  const getFavoriteId = (festivalId: string): string | null => {
    const fav = favorites.find((f) => f.festivalId === festivalId);
    return fav?.id || null;
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoriteId,
  };
}
