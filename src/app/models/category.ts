import {Question} from './question';


export interface Category {

  categoryId?: number;
  categoryName?: string;
  effectiveDate?: Date;
  expirationDate?: Date;
  questions?: Question[];
}
