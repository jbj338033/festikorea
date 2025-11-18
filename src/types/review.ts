import { Timestamp } from 'firebase/firestore';

export interface Review {
  id: string;
  userId: string;
  userEmail: string;
  festivalId: string;
  festivalName: string;
  rating: number;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
