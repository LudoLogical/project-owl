import { FC } from 'react';
import { REVIEW_STEP_NAMES } from '../../content/review-step-names';

const ReviewProgress: FC<{
  currentStep: number;
}> = ({ currentStep }) => {
  return (
    <ul className={'steps steps-vertical'}>
      {REVIEW_STEP_NAMES.map((step, index) => (
        <li
          key={index}
          className={'step' + (index <= currentStep ? ' step-primary' : '')}
        >
          {step}
        </li>
      ))}
    </ul>
  );
};

export default ReviewProgress;
