import { Question } from './question';
export interface PossibleAnswer {
answerValue?: string;
possibleAnswerId?: number;
effectiveDate?: Date;
expirationDate?: Date;
question?: Question;
}
