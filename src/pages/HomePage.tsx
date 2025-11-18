import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFestivals } from '../hooks/useFestivals';
import FestivalList from '../components/festival/FestivalList';
import FestivalFilter from '../components/festival/FestivalFilter';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { isOngoing, isUpcoming, isEnded } from '../utils/dateUtils';

export default function HomePage() {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const { festivals, loading, error, refetch } = useFestivals({
    areaCode: selectedRegion || undefined,
  });

  const filteredFestivals = useMemo(() => {
    return festivals.filter((festival) => {
      if (searchKeyword && !festival.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }

      if (selectedStatus === 'ongoing' && !isOngoing(festival.eventstartdate, festival.eventenddate)) {
        return false;
      }

      if (selectedStatus === 'upcoming' && !isUpcoming(festival.eventstartdate)) {
        return false;
      }

      if (selectedStatus === 'ended' && !isEnded(festival.eventenddate)) {
        return false;
      }

      return true;
    });
  }, [festivals, searchKeyword, selectedStatus]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {t('festival.title')}
          </h1>
          <p className="text-lg text-gray-500">
            {t('festival.description')}
          </p>
        </div>

        <FestivalFilter
          selectedRegion={selectedRegion}
          selectedStatus={selectedStatus}
          searchKeyword={searchKeyword}
          onRegionChange={setSelectedRegion}
          onStatusChange={setSelectedStatus}
          onSearchChange={setSearchKeyword}
        />

        {loading && <Loading />}
        {error && <ErrorMessage message={error} onRetry={refetch} />}
        {!loading && !error && <FestivalList festivals={filteredFestivals} />}
      </div>
    </div>
  );
}
