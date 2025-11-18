import axios from 'axios';
import type { Festival, FestivalApiResponse, FestivalFilterParams } from '../types/festival';

const API_URL = import.meta.env.DEV
  ? '/api/B551011/KorService2/searchFestival2'
  : 'https://apis.data.go.kr/B551011/KorService2/searchFestival2';
const API_KEY = import.meta.env.VITE_FESTIVAL_API_KEY;

const getDefaultEventStartDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

export const fetchFestivals = async (params: FestivalFilterParams = {}): Promise<Festival[]> => {
  try {
    const response = await axios.get<FestivalApiResponse>(API_URL, {
      params: {
        serviceKey: API_KEY,
        numOfRows: params.numOfRows || 20,
        pageNo: params.pageNo || 1,
        MobileOS: 'ETC',
        MobileApp: 'FestiKorea',
        _type: 'json',
        arrange: params.arrange || 'A',
        eventStartDate: params.eventStartDate || getDefaultEventStartDate(),
        eventEndDate: params.eventEndDate,
        areaCode: params.areaCode,
        sigunguCode: params.sigunguCode,
      },
    });

    const items = response.data.response.body.items.item;

    if (!items) {
      return [];
    }

    return Array.isArray(items) ? items : [items];
  } catch (error) {
    console.error('Festival API Error:', error);
    throw new Error('축제 정보를 불러오는데 실패했습니다.');
  }
};

export const fetchFestivalById = async (contentId: string): Promise<Festival | null> => {
  try {
    const festivals = await fetchFestivals({ numOfRows: 1000 });
    return festivals.find(f => f.contentid === contentId) || null;
  } catch (error) {
    console.error('Festival Detail Error:', error);
    throw new Error('축제 상세 정보를 불러오는데 실패했습니다.');
  }
};
