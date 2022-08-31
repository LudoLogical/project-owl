import RecursivePartial from '../../../utils/recursive-partial';
import Review from '../../../model/review';
import {
  DigitalProductsSearchResult,
  PhysicalProductsSearchResult,
} from '../../../pages/api/products';

type StepProps = {
  review: RecursivePartial<Review>;
  setReview: Function;
  setCanAdvance: Function;
  productDetails:
    | DigitalProductsSearchResult
    | PhysicalProductsSearchResult
    | undefined;
  setProductDetails: Function;
};

export default StepProps;
