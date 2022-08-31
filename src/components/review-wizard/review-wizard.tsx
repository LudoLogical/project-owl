import { FC, useState } from 'react';
import ReviewProgress from './review-progress';
import ReviewFAQ from './review-faq';
import Review from '../../model/review';
import RecursivePartial from '../../utils/recursive-partial';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import {
  DigitalProductsSearchResult,
  PhysicalProductsSearchResult,
} from '../../pages/api/products';
import StepProps from './steps/step-props';
import STEPS from './steps/steps';

const emptyReview: RecursivePartial<Review> = {
  reviewer: {},
  subject: {},
  context: {},
  scores: {},
};

const ReviewWizard: FC = () => {
  const [review, setReview] = useState(emptyReview);
  const [currentStep, setCurrentStep] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);

  const [productDetails, setProductDetails] = useState<
    DigitalProductsSearchResult | PhysicalProductsSearchResult | undefined
  >();

  const CurrentStep: FC<StepProps> = STEPS[currentStep];

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
      <main className={'flex-1 overflow-y-auto px-5 mx-auto py-10'}>
        <div
          className={
            'flex flex-col justify-between min-w-[20rem] max-w-2xl mx-auto'
          }
        >
          <div>
            <h1 className={'text-2xl text-center'}>
              {(productDetails ? 'Review of ' : 'Create a new review') +
                (productDetails?.name ?? '')}
            </h1>
            <div className='divider'></div>
            <CurrentStep
              review={review}
              setReview={setReview}
              setCanAdvance={setCanAdvance}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            />
          </div>
          <div className={'flex flex-row justify-between mt-3'}>
            <button
              className={'btn'}
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep <= 0}
            >
              <FiArrowLeft />
              &nbsp;Previous
            </button>
            <button
              className={'btn btn-primary'}
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!(canAdvance && currentStep < STEPS.length - 1)}
            >
              Next&nbsp;
              <FiArrowRight />
            </button>
          </div>
        </div>
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
