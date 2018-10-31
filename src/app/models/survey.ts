import { CategoryAnswer } from './categoryAnswer';
import { MemberAnswer } from './memberAnswer';
export interface Survey {
  surveyId?;
  creationDate?;
  umn?;
  firstName?;
  middleName?;
  lastName?;
  phoneNumber?;
  shortFeedbackGrade?;
  shortFeedbackComment?;
  memberAnswers?: MemberAnswer[];
  categoriesAnswers?: CategoryAnswer[];
}
