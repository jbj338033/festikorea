import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../contexts/AuthContext';

interface FavoriteButtonProps {
  festivalId: string;
  festivalName: string;
  festivalImage?: string;
  onLoginRequired: () => void;
}

export default function FavoriteButton({
  festivalId,
  festivalName,
  festivalImage,
  onLoginRequired,
}: FavoriteButtonProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isFavorite, getFavoriteId, addFavorite, removeFavorite } = useFavorites();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      onLoginRequired();
      return;
    }

    setLoading(true);
    try {
      if (isFavorite(festivalId)) {
        const favoriteId = getFavoriteId(festivalId);
        if (favoriteId) {
          await removeFavorite(favoriteId);
        }
      } else {
        await addFavorite(festivalId, festivalName, festivalImage);
      }
    } catch (error) {
      console.error('Favorite error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFav = isFavorite(festivalId);

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
        isFav
          ? 'bg-primary text-white hover:bg-primary-hover'
          : 'bg-white border-2 border-primary text-primary hover:bg-primary-light'
      } disabled:opacity-50`}
    >
      <span className="text-xl">{isFav ? '❤️' : '🤍'}</span>
      {isFav ? t('favorites.remove') : t('favorites.add')}
    </button>
  );
}
