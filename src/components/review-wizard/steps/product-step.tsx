import { ChangeEvent, FC } from 'react';
import Review from '../../../model/review';
import RecursivePartial from '../../../utils/recursive-partial';
import { ProductsSearchResult } from '../../../pages/api/search-products';
import { FiX } from 'react-icons/fi';
import ProductsTable from '../../products-table';
import ProductsSearch from '../../products-search';

const ProductStep: FC<{
  review: RecursivePartial<Review>;
  setReview: Function;
  setCanAdvance: Function;
  productDetails: ProductsSearchResult | undefined;
  setProductDetails: Function;
}> = ({
  review,
  setReview,
  setCanAdvance,
  productDetails,
  setProductDetails,
}) => {
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
    setIsDigital(event.target.value === 'digital');
  }

  function handleProductSelection(product: ProductsSearchResult) {
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
            products={[productDetails]}
            buttonContent={<FiX className={'w-6 h-6'} />}
            useCircularButton={true}
            onClick={(product: ProductsSearchResult) => {
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
