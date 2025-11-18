import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Festival } from '../../types/festival';

interface FestivalCardProps {
  festival: Festival;
}

export default function FestivalCard({ festival }: FestivalCardProps) {
  const { t } = useTranslation();

  const formatDate = (date: string) => {
    if (!date || date.length !== 8) return '';
    return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
  };

  return (
    <Link to={`/festival/${festival.contentid}`}>
      <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className="aspect-video bg-gray-200 overflow-hidden">
          {festival.firstimage ? (
            <img
              src={festival.firstimage}
              alt={festival.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              {t('festival.noImage')}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {festival.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {festival.addr1}
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(festival.eventstartdate)} ~ {formatDate(festival.eventenddate)}
          </p>
        </div>
      </div>
    </Link>
  );
}
