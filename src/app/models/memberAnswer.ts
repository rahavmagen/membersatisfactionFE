import { PossibleAnswer } from './possibleAnswer';
import { Question } from './question';
import { MemberAnswerId } from './memberAnswerId';
import { Category } from './category';


export interface MemberAnswer {
  id?: MemberAnswerId;
  possibleAnswer?: PossibleAnswer;
  question?: Question;
  freeTextAnswer?: string;
  category?: Category;
  }
