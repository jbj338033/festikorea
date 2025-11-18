export interface Festival {
  contentid: string;
  title: string;
  addr1: string;
  addr2?: string;
  eventstartdate: string;
  eventenddate: string;
  firstimage?: string;
  firstimage2?: string;
  tel?: string;
  overview?: string;
  areacode: string;
}

export interface FestivalApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: Festival[] | Festival;
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export interface FestivalFilterParams {
  areaCode?: string;
  sigunguCode?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  arrange?: string;
  pageNo?: number;
  numOfRows?: number;
}
