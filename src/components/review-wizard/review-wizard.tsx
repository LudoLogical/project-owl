import { FC, ReactNode } from 'react';
import ReviewSteps from './review-steps';
import ReviewFAQ from './review-faq';

const ReviewWizard: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <div
      className={'flex flex-row flex-nowrap h-fill bg-base-300 overflow-hidden'}
    >
      <section
        className={
          'flex-none bg-base-200 h-fill pl-5 pr-8 py-2 overflow-y-auto'
        }
      >
        <ReviewSteps currentStep={1} />
      </section>
      <main className={'flex-1 overflow-y-auto'}>{children}</main>
      <section
        className={'flex-none bg-base-200 w-96 h-fill overflow-y-auto p-2'}
      >
        <ReviewFAQ currentStep={1} />
      </section>
    </div>
  );
};

export default ReviewWizard;
