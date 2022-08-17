import User from './users/user';
import ReviewSubject from './review-subject';
import ReviewContext from './context/review-context';
import ReviewScores from './scores/review-scores';

type Review = {
  reviewer: User;
  title: string;
  subject: ReviewSubject;
  context: ReviewContext;
  scores: ReviewScores;
};

export default Review;
