import { ChangeEvent, FC, useState } from 'react';
import Review from '../../../model/review';
import RecursivePartial from '../../../utils/recursive-partial';
import {
  DigitalProductsSearchResult,
  PhysicalProductsSearchResult,
} from '../../../pages/api/search-products';
import { FiX } from 'react-icons/fi';
import ProductsTable from '../../products-table';
import ProductsSearch from '../../products-search';

const ProductStep: FC<{
  review: RecursivePartial<Review>;
  setReview: Function;
  setCanAdvance: Function;
  productDetails:
    | DigitalProductsSearchResult
    | PhysicalProductsSearchResult
    | undefined;
  setProductDetails: Function;
}> = ({
  review,
  setReview,
  setCanAdvance,
  productDetails,
  setProductDetails,
}) => {
  const [transitionLock, setTransitionLock] = useState(false);

  function setIsDigital(isDigital: boolean | undefined) {
    setReview({
      ...review,
      subject: {
        ...review.subject,
        productIsDigital: isDigital,
      },
    });
  }

  function setProduct(product: string | number | undefined) {
    setReview({
      ...review,
      subject: {
        ...review.subject,
        product: product,
      },
    });
  }

  function handleIsDigitalSelection(event: ChangeEvent<HTMLInputElement>) {
    setTransitionLock(true);
    setIsDigital(event.target.value === 'digital');
  }

  function handleProductSelection(
    product: DigitalProductsSearchResult | PhysicalProductsSearchResult
  ) {
    setProductDetails(product);
    setProduct(product.id);
    setCanAdvance(true);
  }

  if (productDetails === undefined) {
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
            <ProductsSearch
              searchForDigital={review.subject.productIsDigital}
              handleProductSelection={handleProductSelection}
              transitionLock={transitionLock}
              setTransitionLock={setTransitionLock}
            />
          )}
      </>
    );
  } else {
    // noinspection JSUnusedLocalSymbols
    return (
      <>
        <h3>Selected product:</h3>
        <div className={'mt-5 mb-3'}>
          <ProductsTable
            products={
              review.subject?.productIsDigital
                ? [productDetails as DigitalProductsSearchResult]
                : [productDetails as PhysicalProductsSearchResult]
            }
            productsAreDigital={review.subject?.productIsDigital as boolean}
            buttonContent={<FiX className={'w-6 h-6'} />}
            useCircularButton={true}
            onClick={(product: DigitalProductsSearchResult) => {
              setCanAdvance(false);
              setProduct(undefined);
              setProductDetails(undefined);
              setIsDigital(undefined);
            }}
          />
        </div>
      </>
    );
  }
};

export default ProductStep;
