import { PossibleAnswer } from './possibleAnswer';
import { Category } from './category';

export interface Question {

answerType?: string;
displayOrder?: string;
questionId?: number;
questionText?: string;
effectiveDate?: Date;
expirationDate?: Date;
possibleAnswers?: PossibleAnswer[];
category?: Category;

}
