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
    <Link to={`/festival/${festival.contentid}`} className="group">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary transition-all">
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          {festival.firstimage ? (
            <img
              src={festival.firstimage}
              alt={festival.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
              {t('festival.noImage')}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {festival.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
            {festival.addr1}
          </p>
          <p className="text-xs text-gray-400">
            {formatDate(festival.eventstartdate)} ~ {formatDate(festival.eventenddate)}
          </p>
        </div>
      </div>
    </Link>
  );
}
