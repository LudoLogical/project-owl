import { FC } from 'react';
import { REVIEW_STEPS } from '../../content/review-steps';

const ReviewSteps: FC<{
  currentStep: number;
}> = ({ currentStep }) => {
  return (
    <ul className={'steps steps-vertical'}>
      {REVIEW_STEPS.map((step, index) => (
        <li
          key={index}
          className={'step' + (index < currentStep ? ' step-primary' : '')}
        >
          {step}
        </li>
      ))}
    </ul>
  );
};

export default ReviewSteps;
