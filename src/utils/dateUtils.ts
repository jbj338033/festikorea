export const getTodayString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

export const isOngoing = (startDate: string, endDate: string): boolean => {
  const today = getTodayString();
  return startDate <= today && today <= endDate;
};

export const isUpcoming = (startDate: string): boolean => {
  const today = getTodayString();
  return startDate > today;
};

export const isEnded = (endDate: string): boolean => {
  const today = getTodayString();
  return endDate < today;
};
