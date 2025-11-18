import { Timestamp } from 'firebase/firestore';

export interface Favorite {
  id: string;
  userId: string;
  festivalId: string;
  festivalName: string;
  festivalImage?: string;
  createdAt: Timestamp;
}
