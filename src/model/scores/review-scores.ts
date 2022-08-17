import ScoreSet from './score-set';

type ReviewScores = {
  overallScores: ScoreSet;
  mechanicsScores: ScoreSet;
  dynamicsScores: ScoreSet;
  aestheticsScores: ScoreSet;
  literacyReqs: ScoreSet;
};

export default ReviewScores;
