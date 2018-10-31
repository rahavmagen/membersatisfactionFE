import { MemberAnswer } from './memberAnswer';
import { SelectItem } from 'primeng/components/common/selectitem';
import { PossibleAnswer } from './possibleAnswer';



export interface TabData {

  categoryId?: number;
  categoryName?: string;
  memberAnswers?: MemberAnswer[];
  grade?: string;
  gradeText?: string;
  comment?: string;
  tabTouched?: boolean;
  possibleAnswers?: PossibleAnswer[];
}
