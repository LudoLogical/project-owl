type ReviewSubject = {
  product: string | number;
  productIsDigital: boolean;
  releases: number[];
  addOns: string[] | number[];
};

export default ReviewSubject;
