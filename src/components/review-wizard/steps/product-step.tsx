import { ChangeEvent, FC } from 'react';
import Review from '../../../model/review';
import RecursivePartial from '../../../utils/recursive-partial';
import { HiOutlineSearch } from 'react-icons/hi';

const ProductStep: FC<{
  review: RecursivePartial<Review>;
  setReview: Function;
}> = ({ review, setReview }) => {
  function handleIsDigitalSelection(event: ChangeEvent<HTMLInputElement>) {
    setReview({
      ...review,
      subject: {
        ...review.subject,
        productIsDigital: event.target.value === 'digital',
      },
    });
  }

  return (
    <>
      <h3>
        First thing&apos;s first: is this review for a digital product or a
        physical one?
      </h3>

      <div className={'form-control m-3'}>
        <label className={'label cursor-pointer justify-start'}>
          <input
            type={'radio'}
            name={'radio-1'}
            value={'digital'}
            className={'radio'}
            onChange={(e) => handleIsDigitalSelection(e)}
          />
          <span className={'label-text ml-3'}>Digital</span>
        </label>
        <label className={'label cursor-pointer justify-start'}>
          <input
            type={'radio'}
            name={'radio-1'}
            value={'physical'}
            className={'radio'}
            onChange={(e) => handleIsDigitalSelection(e)}
          />
          <span className={'label-text ml-3'}>Physical</span>
        </label>
      </div>

      {review.subject?.productIsDigital !== undefined &&
        review.subject?.productIsDigital !== null && (
          <>
            <h3>What product would you like to review?</h3>
            <div className='form-control mt-3'>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Search…'
                  className='input input-bordered w-64'
                />
                <button className='btn btn-square'>
                  <HiOutlineSearch className={'w-6 h-6'} />
                </button>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default ProductStep;
