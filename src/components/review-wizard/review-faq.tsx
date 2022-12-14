import { FC } from 'react';
import { REVIEW_FAQ } from '../../content/review-faq';

const ReviewFAQ: FC<{
  currentStep: number;
}> = ({ currentStep }) => {
  return (
    <>
      {REVIEW_FAQ[currentStep].map((faq, index) => (
        <div key={index} className={'collapse collapse-arrow'}>
          <input type={'checkbox'} />
          <h2 className={'collapse-title text-lg font-medium'}>
            {faq.question}
          </h2>
          <p className={'collapse-content text-base-content/75'}>
            {faq.answer}
          </p>
        </div>
      ))}
    </>
  );
};

export default ReviewFAQ;
