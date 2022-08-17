import { FC, useState } from 'react';
import ReviewProgress from './review-progress';
import ReviewFAQ from './review-faq';
import STEPS from './steps/steps';
import Review from '../../model/review';
import RecursivePartial from '../../utils/recursive-partial';

const emptyReview: RecursivePartial<Review> = {
  reviewer: {},
  subject: {},
  context: {},
  scores: {},
};

const ReviewWizard: FC = () => {
  const [review, setReview] = useState(emptyReview);
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div
      className={'flex flex-row flex-nowrap h-fill bg-base-300 overflow-x-auto'}
    >
      <section
        className={
          'flex-none bg-base-200 h-fill pl-5 pr-8 py-2 overflow-y-auto'
        }
      >
        <ReviewProgress currentStep={currentStep} />
      </section>
      <main
        className={
          'flex-1 overflow-y-auto min-w-[20rem] max-w-2xl px-5 mx-auto my-10'
        }
      >
        <h1 className={'text-2xl text-center'}>
          {(review.subject?.product && currentStep > 0
            ? 'Review of '
            : 'Create a new review') + (review.subject?.product ?? '')}
        </h1>
        <div className='divider'></div>
        {STEPS[currentStep]({ review: review, setReview: setReview })}
      </main>
      <section
        className={'flex-none bg-base-200 w-96 h-fill overflow-y-auto p-2'}
      >
        <ReviewFAQ currentStep={currentStep} />
      </section>
    </div>
  );
};

export default ReviewWizard;
