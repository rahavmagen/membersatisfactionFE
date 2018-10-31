import { Survey } from './survey';
import { CategoryAnswerId } from './categoryAnswerId';

export interface CategoryAnswer {
  id?: CategoryAnswerId;
  survey?: Survey;
  grade?: number;
  comment?: string;
  }
