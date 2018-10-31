import { PossibleAnswer } from './possibleAnswer';

export interface Question {

  questionText?: string;
  possibleAnswers?: PossibleAnswer[];
}
