import { useTranslation } from 'react-i18next';
import type { Festival } from '../../types/festival';
import FestivalCard from './FestivalCard';

interface FestivalListProps {
  festivals: Festival[];
}

export default function FestivalList({ festivals }: FestivalListProps) {
  const { t } = useTranslation();

  if (festivals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t('common.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {festivals.map((festival) => (
        <FestivalCard key={festival.contentid} festival={festival} />
      ))}
    </div>
  );
}
