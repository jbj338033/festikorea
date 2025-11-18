import { useTranslation } from 'react-i18next';

interface FestivalFilterProps {
  selectedRegion: string;
  selectedStatus: string;
  searchKeyword: string;
  onRegionChange: (region: string) => void;
  onStatusChange: (status: string) => void;
  onSearchChange: (keyword: string) => void;
}

const regions = [
  { code: '', name: '전체 지역' },
  { code: '1', name: '서울' },
  { code: '2', name: '인천' },
  { code: '3', name: '대전' },
  { code: '4', name: '대구' },
  { code: '5', name: '광주' },
  { code: '6', name: '부산' },
  { code: '7', name: '울산' },
  { code: '8', name: '세종' },
  { code: '31', name: '경기' },
  { code: '32', name: '강원' },
  { code: '33', name: '충북' },
  { code: '34', name: '충남' },
  { code: '35', name: '경북' },
  { code: '36', name: '경남' },
  { code: '37', name: '전북' },
  { code: '38', name: '전남' },
  { code: '39', name: '제주' },
];

export default function FestivalFilter({
  selectedRegion,
  selectedStatus,
  searchKeyword,
  onRegionChange,
  onStatusChange,
  onSearchChange,
}: FestivalFilterProps) {
  const { t } = useTranslation();

  const statusOptions = [
    { value: '', label: t('festival.all') },
    { value: 'ongoing', label: t('festival.ongoing') },
    { value: 'upcoming', label: t('festival.upcoming') },
    { value: 'ended', label: t('festival.ended') },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            {t('festival.region')}
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          >
            {regions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            {t('festival.status')}
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-2">
            {t('common.search')}
          </label>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('festival.searchPlaceholder')}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
          />
        </div>
      </div>
    </div>
  );
}
