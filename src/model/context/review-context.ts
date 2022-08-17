import PlayModeContext from './play-mode-context';
import A11yElement from './a11y-element';
import ReviewerCOI from './reviewer-coi';

type ReviewContext = {
  languages: string[];
  otherLanguages?: string;
  playModes: PlayModeContext[];
  a11yFeatures: A11yElement[];
  a11yGaps: A11yElement[];
  conflictOfInterest: ReviewerCOI;
  otherConflictOfInterest?: string;
  amountPaid: string;
  currencyPaid: string;
};

export default ReviewContext;
